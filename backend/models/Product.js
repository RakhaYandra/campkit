const db = require('../config/database');

class Product {
  static async create(productData) {
    const query = `
      INSERT INTO products (name, description, stock_quantity, available_quantity,
        price_per_day, condition_status, image_urls, category_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const values = [
      productData.name,
      productData.description,
      productData.stock_quantity,
      productData.stock_quantity,
      productData.price_per_day,
      productData.condition_status,
      productData.image_urls,
      productData.category_id
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findAll(filters = {}) {
    let query = `
      SELECT p.*, c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1 = 1
    `;
    const values = [];

    if (filters.category_id) {
      values.push(filters.category_id);
      query += ` AND p.category_id = $${values.length}`;
    }

    if (filters.search) {
      values.push(`%${filters.search}%`);
      query += ` AND (p.name ILIKE $${values.length} OR p.description ILIKE $${values.length})`;
    }

    const result = await db.query(query, values);
    return result.rows;
  }

  static async update(id, productData) {
    const query = `
      UPDATE products
      SET name = $1, description = $2, stock_quantity = $3,
          available_quantity = $4, price_per_day = $5,
          condition_status = $6, image_urls = $7,
          category_id = $8, updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
      RETURNING *
    `;
    const values = [
      productData.name,
      productData.description,
      productData.stock_quantity,
      productData.available_quantity,
      productData.price_per_day,
      productData.condition_status,
      productData.image_urls,
      productData.category_id,
      id
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  }
}

module.exports = Product;