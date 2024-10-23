const express = require("express");
const { register, login, updateSuperAdminAccountController } = require("./controller");
const router = express();
const { authenticateSuperAdminToken } = require("../../../middlewares/auth");

router.post("/superadmin/auth/register", register);
router.post("/superadmin/auth/login", login);
router.put(
    "/superadmin/auth/update-superadmin-account",
    authenticateSuperAdminToken,
    updateSuperAdminAccountController,
);

module.exports = router;
