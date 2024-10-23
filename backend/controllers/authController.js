const User = require('../models/User'); // Ensure you have the correct path to your User model
const jwt = require('jsonwebtoken');

// Middleware to authenticate the user
exports.authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Function to get the user profile
exports.getProfile = (req, res) => {
    console.log('User ID:', req.user.id); // Log the user ID
    User.findById(req.user.id)
        .select('-password')
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => {
            console.error('Error fetching profile:', err); // Log the error
            res.status(500).json({ message: 'Error fetching profile', error: err });
        });
};

// Function to update the user profile
exports.updateProfile = async (req, res) => {
    const { phone_number, address, id_card_number } = req.body;

    try {
        const updatedUser = await User.updateProfile(req.user.id, { phone_number, address, id_card_number });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
};

// Function to handle user login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
};