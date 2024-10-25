"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Rental extends Model {
        static associate(models) {
            Rental.belongsTo(models.User, { foreignKey: "userId" });
            Rental.belongsToMany(models.Unit, {
                through: models.RentalUnit,
                foreignKey: "rentalId",
            });
            Rental.hasMany(models.Penalty, { foreignKey: "rentalId" });
        }
    }
    Rental.init(
        {
            rentalDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            maxReturnDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            returnDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            isReturned: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            amount: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Rental",
            paranoid: true,
        },
    );
    return Rental;
};
