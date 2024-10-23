const { StatusCodes } = require("http-status-codes");
const { createUnit, getUnits, getUnit, updateUnit, deleteUnit } = require("../../../service/sequelize/superAdmin/unit");

const create = async (req, res, next) => {
    try {
        const result = await createUnit(req);

        res.status(StatusCodes.CREATED).json({
            status: StatusCodes.CREATED,
            msg: "Register Success",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const get = async (req, res, next) => {
    try {
        const result = await getUnits(req);

        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            msg: "Get Categories Success",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        const result = await getUnit(req);

        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            msg: "Get Category Success",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const result = await updateUnit(req);

        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            msg: "Update Category Success",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const remove = async (req, res, next) => {
    try {
        const result = await deleteUnit(req);

        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            msg: "Delete Category Success",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    create,
    get,
    getById,
    update,
    remove,
};
