const { StatusCodes } = require("http-status-codes");
const { getRentals, updateRentalStatus } = require("../../../service/sequelize/superAdmin/rental");

const get = async (req, res, next) => {
    try {
        const result = await getRentals(req);

        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            msg: "Profile Super Admin fetched successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const result = await updateRentalStatus(req);

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
    get,
    update,
};
