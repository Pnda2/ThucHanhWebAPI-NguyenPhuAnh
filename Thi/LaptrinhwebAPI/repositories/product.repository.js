import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const productRepository = {

    //xem danh sách sản phẩm đang bán (lọc theo keyword, sort theo giá)
    getAll: async (keyword, sortOrder) => {
      logger.info(`Repository: Fetching products with keyword='${keyword}', sort='${sortOrder}'`);
      
      try {
        const db = await pool;
        let sql = "SELECT * FROM products WHERE is_active = 1";
        const params = [];
        if (keyword) {
          sql += " AND name LIKE ?";
          params.push(`%${keyword}%`);
        }
        sql += ` ORDER BY price ${sortOrder}`;
  
        const [rows] = await db.query(sql, params);
        return rows;
  
      } catch (err) {
        logger.error("Repository Error: getAll products failed", err);
        throw err;
      }
    },
    //get theo id
    getById: async (id) => {
      logger.info(`Repository: Fetching product details for ID: ${id}`);
      
      try {
        const db = await pool;
        
        const [rows] = await db.query("SELECT * FROM products WHERE id = ? LIMIT 1", [id]);
        return rows[0];
  
      } catch (err) {
        logger.error(`Repository Error: getById failed for ID ${id}`, err);
        throw err;
      }
    },

};
