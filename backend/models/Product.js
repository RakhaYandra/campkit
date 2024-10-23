const pool = require('../config/database');

const Product = {
  getAll: async () => {
    const query = 'SELECT * FROM products';
    const result = await pool.query(query);
    return result.rows;
  },

  create: async (name, description, stock_quantity, available_quantity, price_per_day, condition_status) => {
    const query = `
      INSERT INTO products (name, description, stock_quantity, available_quantity, price_per_day, condition_status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const result = await pool.query(query, [name, description, stock_quantity, available_quantity, price_per_day, condition_status]);
    return result.rows[0];
  },

  update: async (id, { name, description, stock_quantity, available_quantity, price_per_day, condition_status }) => {
    const query = `
      UPDATE products
      SET name = $1, description = $2, stock_quantity = $3, available_quantity = $4, price_per_day = $5, condition_status = $6
      WHERE id = $7
      RETURNING *;
    `;
    const result = await pool.query(query, [name, description, stock_quantity, available_quantity, price_per_day, condition_status, id]);
    return result.rows[0];
  },

  delete: async (id) => {
    const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};

module.exports = Product;
