const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  getUserBorrowings,
  createBorrowing,
  getActiveBorrowings,
  getBorrowingStats,
  updateBorrowingStatus
} = require('../controllers/borrowingController');

// Get user's borrowings
router.get('/user', authenticateToken, getUserBorrowings);

// Get active borrowings
router.get('/active', authenticateToken, getActiveBorrowings);

// Get borrowing statistics
router.get('/stats', authenticateToken, getBorrowingStats);

// Create new borrowing
router.post('/', authenticateToken, createBorrowing);

// Update borrowing status
router.put('/:id/status', authenticateToken, updateBorrowingStatus);

module.exports = router;