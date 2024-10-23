"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            Category.belongsToMany(models.Unit, {
                through: "UnitCategories",
                foreignKey: "categoryId",
            });
        }
    }
    Category.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Category",
            paranoid: true,
        },
    );
    return Category;
};
