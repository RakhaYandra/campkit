const db = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  static async create(username, email, password, role = 'user') {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (username, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email, role
    `;
    const result = await db.query(query, [username, email, hashedPassword, role]);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  }

  static async updateProfile(userId, data) {
    const query = `
      UPDATE users
      SET username = $1, email = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING id, username, email, role
    `;
    const result = await db.query(query, [data.username, data.email, userId]);
    return result.rows[0];
  }
}

module.exports = User;