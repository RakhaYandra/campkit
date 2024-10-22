const express = require('express');
const { connectDB } = require('./config/database');
const authRoutes = require('./routes/authRoutes'); // Example of auth routes

require('dotenv').config(); // To use environment variables

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to the database
connectDB();

// Define your routes (example: authentication routes)
app.use('/api/auth', authRoutes);

// Handle other routes (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
