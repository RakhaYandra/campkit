const validator = require("validator");
const { BadRequestError, NotFoundError } = require("../../../errors");
const { sequelize, User } = require("../../../../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const config = require("../../../../config/environment-config");
const { Op } = require("sequelize");

config.loadEnvironmentVariables();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const createUser = async (email, password, fullName, phoneNumber, address) => {
    let sequelizeUser;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await sequelize.transaction(async (t) => {
            sequelizeUser = await User.create(
                {
                    email: email,
                    password: hashedPassword,
                    fullName: fullName,
                    phoneNumber: phoneNumber,
                    address: address,
                },
                {
                    transaction: t,
                },
            );
            return sequelizeUser;
        });
        return result;
    } catch (err) {
        throw err;
    }
};

const registerUser = async (req) => {
    const { fullName, email, password, phoneNumber, address } = req.body;

    if (!fullName || !email || !password || !phoneNumber) {
        throw new BadRequestError("Full name, email, password, and phone number are required");
    }

    // Check if email exists in PostgreSQL database
    const userByEmail = await User.findOne({ where: { email } });
    if (userByEmail) {
        throw new BadRequestError("Email already exists");
    }

    // Validate email
    const isEmail = validator.isEmail(email);
    if (!isEmail) {
        throw new BadRequestError("Invalid Email");
    }

    // Validate phone number (Indonesia)
    const isPhoneNumber = validator.isMobilePhone(phoneNumber, "id-ID");
    if (!isPhoneNumber) {
        throw new BadRequestError("Invalid Phone Number");
    }

    // Validate password strength
    const strongPassword = validator.isStrongPassword(password);
    if (!strongPassword) {
        throw new BadRequestError("Weak Password");
    }

    // Create user in PostgreSQL database
    const userCreated = await createUser(email, password, fullName, phoneNumber, address);

    if (!userCreated) {
        throw new Error("User creation failed");
    }

    // Exclude password from the user object
    const { password: userPassword, ...userWithoutPassword } = userCreated.toJSON();

    return userWithoutPassword;
};

const loginUser = async (req) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("Email/Username and password are required");
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
        throw new NotFoundError("User not found");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new BadRequestError("Incorrect password");
    }

    // Exclude password from the user object
    const { password: userPassword, ...userWithoutPassword } = user.toJSON();

    // User is authenticated, generate a JWT
    const token = jwt.sign({ user: userWithoutPassword }, SECRET_KEY, {
        expiresIn: parseInt(process.env.JWT_EXPIRATION, 10),
    });

    return { user: userWithoutPassword, token };
};

const updateUserAccount = async (req) => {
    const { currentPassword, newPassword, newEmail } = req.body;
    const user = req.user.user;

    if (!currentPassword && !newPassword && !newUserName && !newEmail) {
        throw new BadRequestError(
            "At least one field (currentPassword, newPassword, newUserName, newEmail) is required",
        );
    }

    const existingUser = await User.findOne({ where: { id: user.id } });
    if (!existingUser) {
        throw new NotFoundError("User Not Found");
    }

    if (newPassword) {
        if (!currentPassword) {
            throw new BadRequestError("Current password is required to change the password");
        }

        // Validate current password
        const match = await bcrypt.compare(currentPassword, existingUser.password);
        if (!match) {
            throw new BadRequestError("Invalid Current Password");
        }

        // Check if new password is the same as the old password
        const matchOld = await bcrypt.compare(newPassword, existingUser.password);
        if (matchOld) {
            throw new BadRequestError("Password can't be the same as the old password");
        }

        const strongPassword = validator.isStrongPassword(newPassword);
        if (!strongPassword) {
            throw new BadRequestError("Weak Password");
        }

        existingUser.password = await bcrypt.hash(newPassword, saltRounds);
    } else if (currentPassword) {
        throw new BadRequestError("New password is required to change the password");
    }

    if (newEmail) {
        if (newEmail !== existingUser.email) {
            // Validate newEmail
            if (!validator.isEmail(newEmail)) {
                throw new BadRequestError("Invalid email format");
            }

            // Check if email exists in PostgreSQL database
            const userByEmail = await User.findOne({ where: { email: newEmail } });
            if (userByEmail) {
                throw new BadRequestError("Email already exists");
            }
        }

        existingUser.email = newEmail;
    }

    await existingUser.save();

    // Exclude password from the user object
    const { password: userPassword, ...userWithoutPassword } = existingUser.toJSON();

    return userWithoutPassword;
};

const verifyUserPassword = async (req) => {
    const { password } = req.body;
    const user = req.user.user;

    if (!password) {
        throw new BadRequestError("Password is required");
    }

    const existingUser = await User.findOne({ where: { id: user.id } });
    if (!existingUser) {
        throw new NotFoundError("User Not Found");
    }

    // Validate password
    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
        throw new BadRequestError("Invalid Password");
    }

    // Exclude password from the user object
    const { password: userPassword, ...userWithoutPassword } = existingUser.toJSON();

    return userWithoutPassword;
};

module.exports = {
    registerUser,
    loginUser,
    verifyUserPassword,
    updateUserAccount,
};
