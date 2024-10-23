const Notification = require('../models/notification');

exports.getUserNotifications = async (req, res) => {
  const user_id = req.user.id;
  try {
    const notifications = await Notification.getByUserId(user_id);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
};
