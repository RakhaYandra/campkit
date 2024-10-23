"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Units", [
            {
                name: "Tent",
                code: "CAMP-001",
                price: 100.0,
                isAvailable: true,
                image: "tent.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Sleeping Bag",
                code: "CAMP-002",
                price: 50.0,
                isAvailable: true,
                image: "sleeping_bag.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Camping Stove",
                code: "CAMP-003",
                price: 30.0,
                isAvailable: true,
                image: "camping_stove.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Lantern",
                code: "CAMP-004",
                price: 20.0,
                isAvailable: true,
                image: "lantern.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Units", null, {});
    },
};
