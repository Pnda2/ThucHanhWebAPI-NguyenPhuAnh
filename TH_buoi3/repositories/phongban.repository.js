import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const PhongBanRepository = {
  //Lấy tất cả phòng ban
  getAll: async () => {
    logger.info("Repository: Fetching all PhongBan");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM PhongBan");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },
 
};