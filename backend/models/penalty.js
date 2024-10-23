"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Penalty extends Model {
        static associate(models) {
            Penalty.belongsTo(models.Rental, { foreignKey: "rentalId" });
        }
    }
    Penalty.init(
        {
            amount: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            reasons: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Penalty",
            paranoid: true,
        },
    );
    return Penalty;
};
