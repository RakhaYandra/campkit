const { SuperAdmin } = require("../../../../models");
const { BadRequestError, NotFoundError } = require("../../../errors");
const validator = require("validator");

const getSuperAdmin = async (req) => {
    const id = req.user?.superAdmin?.id;

    if (!id) {
        throw new BadRequestError("Super Admin ID is required");
    }

    const superAdmin = await SuperAdmin.findByPk(id, { attributes: { exclude: ["password"] } });
    if (!superAdmin) {
        throw new NotFoundError("Super Admin not found");
    }
    return superAdmin;
};

const updateSuperAdmin = async (req) => {
    const id = req.user?.superAdmin?.id;
    const { fullName, image } = req.body;

    if (!id) {
        throw new BadRequestError("Super Admin ID is required");
    }

    const superAdmin = await SuperAdmin.findByPk(id);
    if (!superAdmin) {
        throw new NotFoundError("Super Admin not found");
    }

    if (!fullName) {
        throw new BadRequestError("Super Admin full name is required");
    }

    // Validate base64 image
    if (image && !validator.isBase64(image)) {
        throw new BadRequestError("Invalid base64 image");
    }

    superAdmin.fullName = fullName;
    superAdmin.image = image;

    await superAdmin.save();

    // Exclude password from the returned super admin object
    const { password: superAdminPassword, ...superAdminWithoutPassword } = superAdmin.toJSON();

    return superAdminWithoutPassword;
};

module.exports = {
    getSuperAdmin,
    updateSuperAdmin,
};
