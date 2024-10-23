const express = require("express");
const { create, get, getById, update, remove } = require("./controller");
const router = express();
const { authenticateSuperAdminToken } = require("../../../middlewares/auth");

router.post("/superadmin/category", authenticateSuperAdminToken, create);
router.get("/superadmin/categories", authenticateSuperAdminToken, get);
router.get("/superadmin/category/:id", authenticateSuperAdminToken, getById);
router.put("/superadmin/category/:id", authenticateSuperAdminToken, update);
router.delete("/superadmin/category/:id", authenticateSuperAdminToken, remove);

router.get("/categories", get);

module.exports = router;
