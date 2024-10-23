const { Category } = require("../../../../models");

const createCategory = async (req) => {
    const { name, description } = req.body;

    if (!name || !description) {
        throw new BadRequestError("Category name is required");
    }

    const category = await Category.create({ name, description });

    return category;
};

const getCategories = async (req) => {
    const categories = await Category.findAll();

    return categories;
};

const getCategory = async (req) => {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
        throw new NotFoundError("Category not found");
    }

    return category;
};

const updateCategory = async (req) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
        throw new NotFoundError("Category not found");
    }

    category.name = name;
    category.description = description;

    await category.save();

    return category;
};

const deleteCategory = async (req) => {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
        throw new NotFoundError("Category not found");
    }

    await category.destroy();

    return category;
};

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
};
