const { Unit, UnitCategory, Category, sequelize } = require("../../../../models");
const { BadRequestError, NotFoundError } = require("../../../errors");
const validator = require("validator");

const createUnit = async (req) => {
    const { name, price, isAvailable, image, categories } = req.body;

    if (!name || !price || !isAvailable) {
        throw new BadRequestError("Unit name, price, and availability are required");
    }

    if (!Array.isArray(categories) || categories.length === 0) {
        throw new BadRequestError("Categories are required and should be an array");
    }

    // Validate base64 image
    if (image && !validator.isBase64(image)) {
        throw new BadRequestError("Invalid base64 image");
    }

    const t = await sequelize.transaction();

    try {
        // Fetch the last code
        const lastUnit = await Unit.findOne(
            {
                order: [["code", "DESC"]],
            },
            { transaction: t },
        );

        // Generate the new code
        let newCode = "CAMP-001";
        if (lastUnit) {
            const lastCode = lastUnit.code;
            const lastNumber = parseInt(lastCode.split("-")[1], 10);
            const newNumber = lastNumber + 1;
            newCode = `CAMP-${String(newNumber).padStart(3, "0")}`;
        }

        // Create the unit
        const unit = await Unit.create({ name, code: newCode, price, isAvailable, image }, { transaction: t });

        // Create entries in UnitCategory for each category
        for (const categoryId of categories) {
            // Ensure the category exists
            const category = await Category.findByPk(categoryId);
            if (!category) {
                throw new BadRequestError(`Category with id ${categoryId} does not exist`);
            }

            await UnitCategory.create({ unitId: unit.id, categoryId }, { transaction: t });
        }

        await t.commit();

        return unit;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const getUnits = async (req) => {
    const units = await Unit.findAll({
        include: [
            {
                model: Category,
                attributes: ["name"], // Include only the category name
                through: { attributes: [] }, // Exclude UnitCategory attributes
            },
        ],
    });

    return units;
};

const getUnit = async (req) => {
    const { id } = req.params;

    const unit = await Unit.findByPk(id, {
        include: [
            {
                model: Category,
                attributes: ["name"],
                through: { attributes: [] }, // Exclude UnitCategory attributes
            },
        ],
    });

    if (!unit) {
        throw new NotFoundError("Unit not found");
    }

    return unit;
};

const updateUnit = async (req) => {
    const { id } = req.params;
    const { name, price, isAvailable, image, categories } = req.body;

    const unit = await Unit.findByPk(id);

    if (!unit) {
        throw new NotFoundError("Unit not found");
    }

    // Validate base64 image
    if (image && !validator.isBase64(image)) {
        throw new BadRequestError("Invalid base64 image");
    }

    unit.name = name;
    unit.price = price;
    unit.isAvailable = isAvailable;
    unit.image = image;

    const t = await sequelize.transaction();

    try {
        await unit.save({ transaction: t });

        if (Array.isArray(categories) && categories.length > 0) {
            // Remove existing categories
            await UnitCategory.destroy({ where: { unitId: unit.id }, transaction: t });

            // Add new categories
            for (const categoryId of categories) {
                // Ensure the category exists
                const category = await Category.findByPk(categoryId);
                if (!category) {
                    throw new BadRequestError(`Category with id ${categoryId} does not exist`);
                }

                await UnitCategory.create({ unitId: unit.id, categoryId }, { transaction: t });
            }
        }

        await t.commit();

        return unit;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const deleteUnit = async (req) => {
    const { id } = req.params;

    const unit = await Unit.findByPk(id);

    if (!unit) {
        throw new NotFoundError("Unit not found");
    }

    const t = await sequelize.transaction();

    try {
        // Remove associated categories
        await UnitCategory.destroy({ where: { unitId: unit.id }, transaction: t });

        // Delete the unit
        await unit.destroy({ transaction: t });

        await t.commit();

        return unit;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

module.exports = {
    createUnit,
    getUnits,
    getUnit,
    updateUnit,
    deleteUnit,
};
