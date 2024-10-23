const { User } = require("../../../../models");
const { BadRequestError, NotFoundError } = require("../../../errors");
const validator = require("validator");

const getUser = async (req) => {
    const id = req.user?.user?.id;

    if (!id) {
        throw new BadRequestError("User ID is required");
    }

    const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
    });
    if (!user) {
        throw new NotFoundError("User not found");
    }
    return user;
};

const updateUser = async (req) => {
    const id = req.user?.user?.id;
    const { fullName, email, phoneNumber, address, image } = req.body;

    if (!id) {
        throw new BadRequestError("User ID is required");
    }

    const user = await User.findByPk(id);
    if (!user) {
        throw new NotFoundError("User not found");
    }

    // Validate required fields
    if (!fullName) {
        throw new BadRequestError("Full name is required");
    }
    if (!email || !validator.isEmail(email)) {
        throw new BadRequestError("Valid email is required");
    }
    if (!phoneNumber || !validator.isMobilePhone(phoneNumber, "id-ID")) {
        throw new BadRequestError("Valid phone number is required");
    }
    if (!address) {
        throw new BadRequestError("Address is required");
    }

    // Validate base64 image
    if (image && !validator.isBase64(image)) {
        throw new BadRequestError("Invalid base64 image");
    }

    // Update user fields
    user.fullName = fullName;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.address = address;
    user.image = image;

    await user.save();

    // Exclude password from the returned user object
    const { password: userPassword, ...userWithoutPassword } = user.toJSON();

    return userWithoutPassword;
};

module.exports = {
    getUser,
    updateUser,
};
