const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, hashedPassword, role || 'user']
    );

    const token = jwt.sign(
      { id: result.rows[0].id, role: result.rows[0].role },
      'your_jwt_secret',
      { expiresIn: '24h' }
    );

    res.status(201).json({ user: result.rows[0], token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid login credentials');
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      'your_jwt_secret',
      { expiresIn: '24h' }
    );

    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login };