const notification = require('../models/notification');

const createNotification = async (userId, title, message, type) => {
  try {
    return await notification.create({
      user_id: userId,
      title,
      message,
      type
    });
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

const notifyBorrowingStatus = async (userId, borrowingCode, status) => {
  const statusMessages = {
    pending: 'Your borrowing request has been submitted',
    confirmed: 'Your borrowing request has been confirmed',
    cancelled: 'Your borrowing request has been cancelled',
    active: 'Your items are ready for pickup',
    returned: 'Your return has been processed'
  };

  if (statusMessages[status]) {
    await createNotification(
      userId,
      `Borrowing ${status}`,
      `${statusMessages[status]} (${borrowingCode})`,
      'borrowing_update'
    );
  }
};

const notifyReturnReminder = async (userId, borrowingCode, daysLeft) => {
  await createNotification(
    userId,
    'Return Reminder',
    `Your borrowing (${borrowingCode}) is due in ${daysLeft} days`,
    'return_reminder'
  );
};

module.exports = {
  createNotification,
  notifyBorrowingStatus,
  notifyReturnReminder
};