"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class SuperAdmin extends Model {}
    SuperAdmin.init(
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "SuperAdmin",
            paranoid: true,
        },
    );
    return SuperAdmin;
};
