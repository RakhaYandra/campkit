const express = require("express");
const { register, login, verifyUserPasswordController, updateUserAccountController } = require("./controller");
const router = express();
const { authenticateUserToken } = require("../../../middlewares/auth");

router.post("/user/auth/register", register);
router.post("/user/auth/login", login);

router.post("/user/auth/verify-user-password", authenticateUserToken, verifyUserPasswordController);
router.put("/user/auth/update-user-account", authenticateUserToken, updateUserAccountController);

module.exports = router;
