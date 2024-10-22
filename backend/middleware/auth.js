const jwt = require('jsonwebtoken');

// Authenticate user by verifying JWT token
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to authenticate token' });
  }
};

// Authorize user based on role
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Access forbidden: Role mismatch' });
    }
    next();
  };
};

module.exports = { authenticate, authorizeRole };
