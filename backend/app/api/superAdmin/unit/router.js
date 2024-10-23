const express = require("express");
const { create, get, getById, update, remove } = require("./controller");
const router = express();
const { authenticateSuperAdminToken } = require("../../../middlewares/auth");

router.post("/superadmin/unit", authenticateSuperAdminToken, create);
router.get("/superadmin/units", authenticateSuperAdminToken, get);
router.get("/superadmin/unit/:id", authenticateSuperAdminToken, getById);
router.put("/superadmin/unit/:id", authenticateSuperAdminToken, update);
router.delete("/superadmin/unit/:id", authenticateSuperAdminToken, remove);

router.get("/units", get);

module.exports = router;
