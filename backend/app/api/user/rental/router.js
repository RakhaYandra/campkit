const express = require("express");
const { get, create } = require("./controller");
const router = express.Router();
const { authenticateUserToken } = require("../../../middlewares/auth");

router.get("/user/rentals", authenticateUserToken, get);
router.post("/user/rental", authenticateUserToken, create);

module.exports = router;
