const { StatusCodes } = require("http-status-codes");
const { getUserRentals, createRental } = require("../../../service/sequelize/user/rental");

const get = async (req, res, next) => {
    try {
        const result = await getUserRentals(req);

        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            msg: "Rental Successly Fetched",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const result = await createRental(req);

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
    create,
};
