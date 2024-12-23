"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("UnitCategories", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            unitId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Units",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            categoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Categories",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("UnitCategories");
    },
};
