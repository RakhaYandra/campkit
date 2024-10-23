const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, stock_quantity, available_quantity, price_per_day, condition_status } = req.body;
  try {
    const newProduct = await Product.create(name, description, stock_quantity, available_quantity, price_per_day, condition_status);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  try {
    const updatedProduct = await Product.update(id, productData);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.delete(id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};
