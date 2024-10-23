const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
  async register(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  async updateProfile(userId, phone_number, address) {
    const result = await pool.query(
      'UPDATE users SET phone_number=$1, address=$2 WHERE id=$3 RETURNING *',
      [phone_number, address, userId]
    );
    return result.rows[0];
  },

  findById: async (id) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  createUser: async (username, email, hashedPassword, role) => {
    const query = `
        INSERT INTO users (username, email, password, role) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id, username, email, role;
    `;
    const result = await pool.query(query, [username, email, hashedPassword, role]);
    return result.rows[0];
},
};

module.exports = User;
