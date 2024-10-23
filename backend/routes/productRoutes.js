const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middleware/auth');
const productController = require('../controllers/productController');

// User routes
router.get('/', productController.getAllProducts);

// Admin routes
router.post('/', authMiddleware, isAdmin, productController.createProduct);
router.put('/:id', authMiddleware, isAdmin, productController.updateProduct);
router.delete('/:id', authMiddleware, isAdmin, productController.deleteProduct);

module.exports = router;
