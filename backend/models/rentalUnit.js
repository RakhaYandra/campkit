"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class RentalUnit extends Model {
        static associate(models) {
            RentalUnit.belongsTo(models.Rental, { foreignKey: "rentalId" });
            RentalUnit.belongsTo(models.Unit, { foreignKey: "unitId" });
        }
    }
    RentalUnit.init(
        {},
        {
            sequelize,
            modelName: "RentalUnit",
        },
    );
    return RentalUnit;
};
