const notification = require('../models/notification');

// Handler untuk mendapatkan semua notifikasi user
const getNotifications = async (req, res) => {
  try {
    const notifications = await notification.getByUserId(req.user.id);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handler untuk menandai notifikasi sebagai telah dibaca
const markAsRead = async (req, res) => {
  try {
    const result = await notification.markAsRead(req.params.id, req.user.id);
    if (!result) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handler untuk mendapatkan jumlah notifikasi yang belum dibaca
const getUnreadCount = async (req, res) => {
  try {
    const count = await notification.getUnreadCount(req.user.id);
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Pastikan semua handler diexport
module.exports = {
  getNotifications,
  markAsRead,
  getUnreadCount
};