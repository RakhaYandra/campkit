const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const borrowingController = require('../controllers/borrowingController');

// User routes
router.post('/', authMiddleware, borrowingController.createBorrowing);
router.get('/user', authMiddleware, borrowingController.getUserBorrowings);

module.exports = router;
