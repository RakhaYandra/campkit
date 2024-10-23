const express = require("express");
const { getUserController, updateUserController } = require("./controller");
const router = express.Router();
const { authenticateUserToken } = require("../../../middlewares/auth");

router.get("/user/profile", authenticateUserToken, getUserController);
router.put("/user/profile", authenticateUserToken, updateUserController);

module.exports = router;
