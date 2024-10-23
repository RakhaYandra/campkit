const pool = require('../config/database');

const Borrowing = {
  create: async (user_id, product_id, quantity, borrow_date, return_date) => {
    const query = `
      INSERT INTO borrowings (user_id, product_id, quantity, borrow_date, return_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const result = await pool.query(query, [user_id, product_id, quantity, borrow_date, return_date]);
    return result.rows[0];
  },

  getByUserId: async (user_id) => {
    const query = 'SELECT * FROM borrowings WHERE user_id = $1';
    const result = await pool.query(query, [user_id]);
    return result.rows;
  },
};

module.exports = Borrowing;
