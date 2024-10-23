"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UnitCategory extends Model {
        static associate(models) {
            UnitCategory.belongsTo(models.Category, { foreignKey: "categoryId" });
            UnitCategory.belongsTo(models.Unit, { foreignKey: "unitId" });
        }
    }
    UnitCategory.init(
        {},
        {
            sequelize,
            modelName: "UnitCategory",
        },
    );
    return UnitCategory;
};
