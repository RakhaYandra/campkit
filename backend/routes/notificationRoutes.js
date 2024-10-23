const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const notificationController = require('../controllers/notificationController');

// User routes
router.get('/', authMiddleware, notificationController.getUserNotifications);

module.exports = router;
