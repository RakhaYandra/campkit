const { StatusCodes } = require("http-status-codes");
const {
    getUser,
    updateUser,
} = require("../../../service/sequelize/user/profile");

const getUserController = async (req, res, next) => {
    try {
        const result = await getUser(req);

        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            msg: "Profile User fetched successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const updateUserController = async (req, res, next) => {
    try {
        const result = await updateUser(req);

        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            msg: "Profile User updated successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getUserController,
    updateUserController,
};
