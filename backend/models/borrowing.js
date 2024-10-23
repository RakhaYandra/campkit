// models/borrowing.js
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class Borrowing {
  // Create new borrowing
  static async create(borrowingData) {
    const client = await db.connect();
    try {
      await client.query('BEGIN');
      
      // Check active borrowings limit
      const activeCount = await this.getActiveBorrowingsCount(borrowingData.user_id);
      if (activeCount >= 2) {
        throw new Error('Maximum active borrowings limit reached (2)');
      }
      
      // Generate unique booking code
      const bookingCode = `BRW-${uuidv4().slice(0, 8)}`;
      
      // Insert main borrowing record
      const borrowingQuery = `
        INSERT INTO borrowings (booking_code, user_id, status, total_price,
          borrow_date, return_date)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
      const borrowingValues = [
        bookingCode,
        borrowingData.user_id,
        'pending',
        borrowingData.total_price,
        borrowingData.borrow_date,
        borrowingData.return_date
      ];
      
      const borrowing = await client.query(borrowingQuery, borrowingValues);
      
      // Insert borrowing items
      for (const item of borrowingData.items) {
        // Check product availability
        const productQuery = `
          SELECT available_quantity 
          FROM products 
          WHERE id = $1 AND available_quantity >= $2
        `;
        const productResult = await client.query(productQuery, [item.product_id, item.quantity]);
        
        if (productResult.rows.length === 0) {
          throw new Error('Product not available in requested quantity');
        }

        const itemQuery = `
          INSERT INTO borrowing_items (borrowing_id, product_id, quantity,
            price_per_day, subtotal)
          VALUES ($1, $2, $3, $4, $5)
        `;
        await client.query(itemQuery, [
          borrowing.rows[0].id,
          item.product_id,
          item.quantity,
          item.price_per_day,
          item.subtotal
        ]);
        
        // Update product available quantity
        await client.query(`
          UPDATE products
          SET available_quantity = available_quantity - $1
          WHERE id = $2
        `, [item.quantity, item.product_id]);
      }
      
      await client.query('COMMIT');
      return borrowing.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Get user borrowings with items
  static async getUserBorrowings(userId) {
    const query = `
      SELECT b.*, 
        json_agg(json_build_object(
          'product_id', bi.product_id,
          'quantity', bi.quantity,
          'price_per_day', bi.price_per_day,
          'subtotal', bi.subtotal,
          'product_name', p.name
        )) as items
      FROM borrowings b
      LEFT JOIN borrowing_items bi ON b.id = bi.borrowing_id
      LEFT JOIN products p ON bi.product_id = p.id
      WHERE b.user_id = $1
      GROUP BY b.id
      ORDER BY b.created_at DESC
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  }

  // Get active borrowings
  static async getActiveBorrowings(userId) {
    const query = `
      SELECT b.*, 
        json_agg(json_build_object(
          'product_id', bi.product_id,
          'quantity', bi.quantity,
          'product_name', p.name
        )) as items
      FROM borrowings b
      LEFT JOIN borrowing_items bi ON b.id = bi.borrowing_id
      LEFT JOIN products p ON bi.product_id = p.id
      WHERE b.user_id = $1 
      AND b.status IN ('confirmed', 'active')
      AND b.return_date >= CURRENT_DATE
      GROUP BY b.id
      ORDER BY b.return_date ASC
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  }

  // Get count of active borrowings
  static async getActiveBorrowingsCount(userId) {
    const query = `
      SELECT COUNT(*) 
      FROM borrowings 
      WHERE user_id = $1 
      AND status IN ('confirmed', 'active')
      AND return_date >= CURRENT_DATE
    `;
    const result = await db.query(query, [userId]);
    return parseInt(result.rows[0].count);
  }

  // Update borrowing status
  static async updateStatus(borrowingId, status, adminNotes = null) {
    const client = await db.connect();
    try {
      await client.query('BEGIN');

      const query = `
        UPDATE borrowings
        SET status = $1, admin_notes = $2, 
            actual_return_date = CASE 
              WHEN $1 = 'returned' THEN CURRENT_DATE 
              ELSE actual_return_date 
            END,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
        RETURNING *
      `;
      const result = await client.query(query, [status, adminNotes, borrowingId]);

      // If status is 'returned', update product quantities
      if (status === 'returned') {
        const itemsQuery = `
          SELECT product_id, quantity
          FROM borrowing_items
          WHERE borrowing_id = $1
        `;
        const items = await client.query(itemsQuery, [borrowingId]);

        for (const item of items.rows) {
          await client.query(`
            UPDATE products
            SET available_quantity = available_quantity + $1
            WHERE id = $2
          `, [item.quantity, item.product_id]);
        }
      }

      await client.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Calculate penalty for late returns
  static async calculatePenalty(borrowingId) {
    const query = `
      UPDATE borrowings
      SET penalty_amount = (
        CASE 
          WHEN actual_return_date > return_date 
          THEN (actual_return_date - return_date) * (total_price / (return_date - borrow_date))
          ELSE 0
        END
      )
      WHERE id = $1
      RETURNING penalty_amount
    `;
    const result = await db.query(query, [borrowingId]);
    return result.rows[0];
  }

  // Get user borrowing statistics
  static async getUserStats(userId) {
    const client = await db.connect();
    try {
      const stats = {};
      
      // Get total borrowings
      const totalQuery = `
        SELECT COUNT(*) as total_count, 
               SUM(total_price) as total_spent
        FROM borrowings 
        WHERE user_id = $1
      `;
      const totalResult = await client.query(totalQuery, [userId]);
      stats.totalBorrowings = parseInt(totalResult.rows[0].total_count);
      stats.totalSpent = parseFloat(totalResult.rows[0].total_spent) || 0;

      // Get active borrowings
      const activeQuery = `
        SELECT COUNT(*) 
        FROM borrowings 
        WHERE user_id = $1 
        AND status IN ('confirmed', 'active')
        AND return_date >= CURRENT_DATE
      `;
      const activeResult = await client.query(activeQuery, [userId]);
      stats.activeBorrowings = parseInt(activeResult.rows[0].count);

      // Get monthly borrowings for the last 6 months
      const monthlyQuery = `
        SELECT 
          DATE_TRUNC('month', created_at) as month,
          COUNT(*) as count
        FROM borrowings 
        WHERE user_id = $1
        AND created_at >= NOW() - INTERVAL '6 months'
        GROUP BY month
        ORDER BY month DESC
      `;
      const monthlyResult = await client.query(monthlyQuery, [userId]);
      stats.monthlyBorrowings = monthlyResult.rows;

      return stats;
    } finally {
      client.release();
    }
  }

  // Get overdue borrowings for notifications
  static async getOverdueBorrowings(userId) {
    const query = `
      SELECT b.*, 
        json_agg(json_build_object(
          'product_id', bi.product_id,
          'quantity', bi.quantity,
          'product_name', p.name
        )) as items
      FROM borrowings b
      LEFT JOIN borrowing_items bi ON b.id = bi.borrowing_id
      LEFT JOIN products p ON bi.product_id = p.id
      WHERE b.user_id = $1 
      AND b.status IN ('confirmed', 'active')
      AND b.return_date < CURRENT_DATE
      AND b.actual_return_date IS NULL
      GROUP BY b.id
      ORDER BY b.return_date ASC
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  }
}

module.exports = new Borrowing();