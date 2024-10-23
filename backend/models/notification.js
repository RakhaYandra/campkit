const pool = require('../config/database');

const Notification = {
  create: async (user_id, title, message, type) => {
    const query = `
      INSERT INTO notifications (user_id, title, message, type)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await pool.query(query, [user_id, title, message, type]);
    return result.rows[0];
  },

  getByUserId: async (user_id) => {
    const query = 'SELECT * FROM notifications WHERE user_id = $1';
    const result = await pool.query(query, [user_id]);
    return result.rows;
  },
};

module.exports = Notification;
