const { StatusCodes } = require("http-status-codes");
const {
    registerSuperAdmin,
    loginSuperAdmin,
    updateSuperAdminAccount,
} = require("../../../service/sequelize/superAdmin/auth");

const register = async (req, res, next) => {
    try {
        const result = await registerSuperAdmin(req);

        res.status(StatusCodes.CREATED).json({
            status: StatusCodes.CREATED,
            msg: "Register Success",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const result = await loginSuperAdmin(req);

        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            msg: "Login Success",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const updateSuperAdminAccountController = async (req, res, next) => {
    try {
        const result = await updateSuperAdminAccount(req);

        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            msg: "Update Account Success",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    register,
    login,
    updateSuperAdminAccountController,
};
