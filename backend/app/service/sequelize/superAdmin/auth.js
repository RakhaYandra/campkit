const validator = require("validator");
const { BadRequestError, NotFoundError } = require("../../../errors");
const { sequelize, SuperAdmin } = require("../../../../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const config = require("../../../../config/environment-config");
const { Op } = require("sequelize"); // Import Op from sequelize

config.loadEnvironmentVariables();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const createSuperAdmin = async (email, password, fullName) => {
    let sequelizeSuperAdmin;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await sequelize.transaction(async (t) => {
            sequelizeSuperAdmin = await SuperAdmin.create(
                {
                    email: email,
                    password: hashedPassword,
                    fullName: fullName,
                },
                {
                    transaction: t,
                },
            );
            return sequelizeSuperAdmin;
        });
        return result;
    } catch (err) {
        throw err;
    }
};

const registerSuperAdmin = async (req) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        throw new BadRequestError("Full name, email, and password are required");
    }

    // Check if email exists in PostgreSQL database
    const superAdminByEmail = await SuperAdmin.findOne({ where: { email } });
    if (superAdminByEmail) {
        throw new BadRequestError("Email already exists");
    }

    // Validate email
    const isEmail = validator.isEmail(email);
    if (!isEmail) {
        throw new BadRequestError("Invalid Email");
    }

    // Validate password strength
    const strongPassword = validator.isStrongPassword(password);
    if (!strongPassword) {
        throw new BadRequestError("Weak Password");
    }

    // Create user in PostgreSQL database
    const superAdminCreated = await createSuperAdmin(email, password, fullName);

    if (!superAdminCreated) {
        throw new Error("Super Admin creation failed");
    }

    return superAdminCreated;
};

const loginSuperAdmin = async (req) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("Email and password are required");
    }

    const superAdmin = await SuperAdmin.findOne({ where: { email } });
    if (!superAdmin) {
        throw new NotFoundError("Super Admin not found");
    }

    const match = await bcrypt.compare(password, superAdmin.password);
    if (!match) {
        throw new BadRequestError("Incorrect password");
    }

    // Exclude password from the user object
    const { password: superAdminPassword, ...superAdminWithoutPassword } = superAdmin.toJSON();

    // User is authenticated, generate a JWT
    const token = jwt.sign({ superAdmin: superAdminWithoutPassword }, SECRET_KEY, {
        expiresIn: parseInt(process.env.JWT_EXPIRATION, 10),
    });

    return { superAdmin: superAdminWithoutPassword, token };
};

const updateSuperAdminAccount = async (req) => {
    const { currentPassword, newPassword, newEmail } = req.body;
    const user = req.user.superAdmin;

    if (!currentPassword && !newPassword && !newEmail) {
        throw new BadRequestError("At least one field (currentPassword, newPassword, newEmail) is required");
    }

    const superAdmin = await SuperAdmin.findOne({ where: { id: user.id } });
    if (!superAdmin) {
        throw new NotFoundError("Super Admin Not Found");
    }

    if (newPassword) {
        if (!currentPassword) {
            throw new BadRequestError("Current password is required to change the password");
        }

        // Validate current password
        const match = await bcrypt.compare(currentPassword, superAdmin.password);
        if (!match) {
            throw new BadRequestError("Invalid Current Password");
        }

        // Check if new password is the same as the old password
        const matchOld = await bcrypt.compare(newPassword, superAdmin.password);
        if (matchOld) {
            throw new BadRequestError("Password can't be the same as the old password");
        }

        const strongPassword = validator.isStrongPassword(newPassword);
        if (!strongPassword) {
            throw new BadRequestError("Weak Password");
        }

        superAdmin.password = await bcrypt.hash(newPassword, saltRounds);
    } else if (currentPassword) {
        throw new BadRequestError("New password is required to change the password");
    }

    if (newEmail) {
        if (newEmail !== superAdmin.email) {
            // Validate newEmail
            if (!validator.isEmail(newEmail)) {
                throw new BadRequestError("Invalid email format");
            }

            // Check if email exists in PostgreSQL database
            const superAdminByEmail = await SuperAdmin.findOne({ where: { email: newEmail } });
            if (superAdminByEmail) {
                throw new BadRequestError("Email already exists");
            }
        }

        superAdmin.email = newEmail;
    }

    await superAdmin.save();

    // Exclude password from the user object
    const { password: superAdminPassword, ...superAdminWithoutPassword } = superAdmin.toJSON();

    return superAdminWithoutPassword;
};

module.exports = {
    registerSuperAdmin,
    loginSuperAdmin,
    updateSuperAdminAccount,
};
