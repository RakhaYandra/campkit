const express = require("express");
const { getSuperAdminController, updateSuperAdminController } = require("./controller");
const router = express.Router();
const { authenticateSuperAdminToken } = require("../../../middlewares/auth");

router.get("/superadmin/profile", authenticateSuperAdminToken, getSuperAdminController);
router.put("/superadmin/profile", authenticateSuperAdminToken, updateSuperAdminController);

module.exports = router;
