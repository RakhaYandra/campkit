"use strict";
const bcrypt = require("bcrypt");

module.exports = {
    async up(queryInterface, Sequelize) {
        const hashedPassword1 = await bcrypt.hash("@User123", 10);
        const hashedPassword2 = await bcrypt.hash("@User123", 10);

        await queryInterface.bulkInsert("Users", [
            {
                email: "user1@example.com",
                fullName: "John Doe",
                password: hashedPassword1,
                phoneNumber: "1234567890",
                address: "123 Main St",
                image: "john_doe.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: "user2@example.com",
                fullName: "Jane Smith",
                password: hashedPassword2,
                phoneNumber: "0987654321",
                address: "456 Elm St",
                image: "jane_smith.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
