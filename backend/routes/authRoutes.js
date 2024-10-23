const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database'); // Adjust the path as necessary
const router = express.Router();
const { authMiddleware, getProfile } = require('../controllers/authController'); // Ensure correct import



router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body; // Include role in the request body
  try {
    // Hash password and save user logic...
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.query(
      'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, hashedPassword, role || 'user']
    );
    const token = jwt.sign(
      { id: newUser.rows[0].id, role: newUser.rows[0].role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ user: newUser.rows[0], token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.rows[0].id, role: user.rows[0].role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ user: user.rows[0], token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/profile', authMiddleware, getProfile);

module.exports = router;