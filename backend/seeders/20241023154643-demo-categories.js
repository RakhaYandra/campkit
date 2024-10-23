"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Categories", [
            {
                name: "Camping Gear",
                description: "Essential gear for camping",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Camping Accessories",
                description: "Accessories for a better camping experience",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // Add more categories as needed
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Categories", null, {});
    },
};
