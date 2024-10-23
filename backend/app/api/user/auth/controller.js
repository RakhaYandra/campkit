const { StatusCodes } = require("http-status-codes");
const {
    registerUser,
    loginUser,
    verifyUserPassword,
    updateUserAccount,
} = require("../../../service/sequelize/user/auth");

const register = async (req, res, next) => {
    try {
        const result = await registerUser(req);

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
        const result = await loginUser(req);

        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            msg: "Login Success",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const verifyUserPasswordController = async (req, res, next) => {
    try {
        const result = await verifyUserPassword(req);

        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            msg: "Password Verified",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const updateUserAccountController = async (req, res, next) => {
    try {
        const result = await updateUserAccount(req);

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
    verifyUserPasswordController,
    updateUserAccountController,
};
