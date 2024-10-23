const { StatusCodes } = require("http-status-codes");
const {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
} = require("../../../service/sequelize/superAdmin/category");

const create = async (req, res, next) => {
    try {
        const result = await createCategory(req);

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
        const result = await getCategories(req);

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
        const result = await getCategory(req);

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
        const result = await updateCategory(req);

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
        const result = await deleteCategory(req);

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
