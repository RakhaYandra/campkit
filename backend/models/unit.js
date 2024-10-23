"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Unit extends Model {
        static associate(models) {
            Unit.belongsToMany(models.Category, {
                through: "UnitCategories",
                foreignKey: "unitId",
            });
            Unit.belongsToMany(models.Rental, {
                through: models.RentalUnit,
                foreignKey: "unitId",
            });
        }
    }
    Unit.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            code: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            price: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            isAvailable: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            image: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Unit",
            paranoid: true,
        },
    );
    return Unit;
};
