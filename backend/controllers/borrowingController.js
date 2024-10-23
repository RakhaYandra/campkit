// backend/controllers/borrowingController.js
const borrowing = require('../models/borrowing');
const notification = require('../models/notification');

const getUserBorrowings = async (req, res) => {
  try {
    const borrowings = await borrowing.getUserBorrowings(req.user.id);
    res.json(borrowings);
  } catch (error) {
    console.error('Error in getUserBorrowings:', error);
    res.status(500).json({ 
      message: 'Failed to fetch borrowings',
      error: error.message 
    });
  }
};

const getActiveBorrowings = async (req, res) => {
  try {
    const borrowings = await borrowing.getActiveBorrowings(req.user.id);
    res.json(borrowings);
  } catch (error) {
    console.error('Error in getActiveBorrowings:', error);
    res.status(500).json({ 
      message: 'Failed to fetch active borrowings',
      error: error.message 
    });
  }
};

const createBorrowing = async (req, res) => {
  try {
    // Check active borrowings limit
    const activeCount = await borrowing.getActiveBorrowingsCount(req.user.id);
    if (activeCount >= 2) {
      return res.status(400).json({ 
        message: 'You have reached the maximum limit of active borrowings (2)' 
      });
    }

    const borrowingData = {
      ...req.body,
      user_id: req.user.id
    };
    
    const result = await borrowing.create(borrowingData);
    
    // Create notification
    await notification.create({
      user_id: req.user.id,
      title: 'New Borrowing Request',
      message: `Your borrowing request (${result.booking_code}) has been submitted`,
      type: 'borrowing_status'
    });
    
    res.status(201).json(result);
  } catch (error) {
    console.error('Error in createBorrowing:', error);
    res.status(400).json({ 
      message: 'Failed to create borrowing',
      error: error.message 
    });
  }
};

const getBorrowingStats = async (req, res) => {
  try {
    const stats = await borrowing.getUserStats(req.user.id);
    res.json(stats);
  } catch (error) {
    console.error('Error in getBorrowingStats:', error);
    res.status(500).json({ 
      message: 'Failed to fetch borrowing statistics',
      error: error.message 
    });
  }
};

const updateBorrowingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    
    const result = await borrowing.updateStatus(id, status, adminNotes);
    
    if (status === 'returned') {
      await borrowing.calculatePenalty(id);
    }
    
    res.json(result);
  } catch (error) {
    console.error('Error in updateBorrowingStatus:', error);
    res.status(400).json({ 
      message: 'Failed to update borrowing status',
      error: error.message 
    });
  }
};

module.exports = {
  getUserBorrowings,
  getActiveBorrowings,
  createBorrowing,
  getBorrowingStats,
  updateBorrowingStatus
};