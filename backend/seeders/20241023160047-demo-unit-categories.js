"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("UnitCategories", [
            {
                unitId: 1,
                categoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                unitId: 2,
                categoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                unitId: 3,
                categoryId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                unitId: 4,
                categoryId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("UnitCategories", null, {});
    },
};
