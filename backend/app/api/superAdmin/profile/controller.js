const { StatusCodes } = require("http-status-codes");
const { getSuperAdmin, updateSuperAdmin } = require("../../../service/sequelize/superAdmin/profile");

const getSuperAdminController = async (req, res, next) => {
    try {
        const result = await getSuperAdmin(req);

        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            msg: "Profile Super Admin fetched successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const updateSuperAdminController = async (req, res, next) => {
    try {
        const result = await updateSuperAdmin(req);

        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            msg: "Profile Super Admin updated successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getSuperAdminController,
    updateSuperAdminController,
};
