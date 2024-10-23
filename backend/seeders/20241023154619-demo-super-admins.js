"use strict";
const bcrypt = require("bcrypt");

module.exports = {
    async up(queryInterface, Sequelize) {
        const hashedPassword = await bcrypt.hash("@Admin123", 10);

        await queryInterface.bulkInsert("SuperAdmins", [
            {
                email: "admin@campkit.com",
                fullName: "Admin",
                password: hashedPassword,
                image: "admin_one.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("SuperAdmins", null, {});
    },
};
