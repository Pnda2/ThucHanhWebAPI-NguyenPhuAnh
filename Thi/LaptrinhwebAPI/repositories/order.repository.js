import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const orderRepository = {
  //tạo đơn hàng cho user đang đăng nhập (tạo orders + order_items)
  createOrderWithItems: async (userId, itemsWithPrice) => {
    logger.info(`Repository: Creating order for user ${userId}`);
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [orderResult] = await connection.query(
        "INSERT INTO orders (user_id, status) VALUES (?, 'PENDING')",
        [userId]
      );
      const newOrderId = orderResult.insertId;
      for (const item of itemsWithPrice) {
        await connection.query(
          "INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES (?, ?, ?, ?)",
          [newOrderId, item.product_id, item.qty, item.unit_price]
        );
      }

      await connection.commit();

      logger.info(`Repository: Created Order #${newOrderId} successfully`);
      return newOrderId;
    } catch (err) {
      await connection.rollback();
      logger.error("Repository Error: Transaction Rolled back", err);
      throw err;
    } finally {
      connection.release();
    }
  },
  //xem lịch sử đơn hàng của chính mình(lọc theo trạng thái, phân trang)
  getByUserId: async ({ userId, status, limit, offset }) => {
    logger.info(`Repository: Get orders for user ${userId}`);
    try {
      const db = await pool;
      
      // Xây dựng câu query động
      let sql = "SELECT * FROM orders WHERE user_id = ?";
      const params = [userId];

      // Nếu có lọc theo status thì thêm điều kiện
      if (status) {
        sql += " AND status = ?";
        params.push(status);
      }

      // Thêm sắp xếp và phân trang
      sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
      params.push(limit, offset);

      const [rows] = await db.query(sql, params);
      return rows;
    } catch (err) {
      logger.error("Repository Error: findByUserId failed", err);
      throw err;
    }
  },

  // Hàm mới: Đếm tổng số đơn hàng (để tính pagination)
  countByUserId: async ({ userId, status }) => {
    try {
      const db = await pool;
      let sql = "SELECT COUNT(*) as total FROM orders WHERE user_id = ?";
      const params = [userId];

      if (status) {
        sql += " AND status = ?";
        params.push(status);
      }

      const [rows] = await db.query(sql, params);
      return rows[0].total;
    } catch (err) {
      throw err;
    }
  }
};
