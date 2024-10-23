const express = require("express");
const { get, update } = require("./controller");
const router = express.Router();
const { authenticateSuperAdminToken } = require("../../../middlewares/auth");

router.get("/superadmin/rentals", authenticateSuperAdminToken, get);
router.put("/superadmin/rental/:id", authenticateSuperAdminToken, update);

module.exports = router;
