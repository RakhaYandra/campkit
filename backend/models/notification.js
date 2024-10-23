const db = require('../config/database');

class Notification {
  static async getByUserId(userId) {
    const query = `
      SELECT id, title, message, type, is_read, created_at 
      FROM notifications 
      WHERE user_id = $1 
      ORDER BY created_at DESC
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  }

  static async markAsRead(notificationId, userId) {
    const query = `
      UPDATE notifications 
      SET is_read = true 
      WHERE id = $1 AND user_id = $2 
      RETURNING *
    `;
    const result = await db.query(query, [notificationId, userId]);
    return result.rows[0];
  }

  static async create(data) {
    const query = `
      INSERT INTO notifications (user_id, title, message, type)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [data.user_id, data.title, data.message, data.type];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async getUnreadCount(userId) {
    const query = `
      SELECT COUNT(*) 
      FROM notifications 
      WHERE user_id = $1 AND is_read = false
    `;
    const result = await db.query(query, [userId]);
    return parseInt(result.rows[0].count);
  }
}

// Export instance dari class Notification
module.exports = new Notification();