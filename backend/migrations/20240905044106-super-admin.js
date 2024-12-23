"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("SuperAdmins", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            fullName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            image: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deletedAt: {
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("SuperAdmins");
    },
};
