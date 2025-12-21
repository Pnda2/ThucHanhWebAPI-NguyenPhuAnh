import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const GiaoVienRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all GiaoVien");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM GiaoVien");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll GiaoVien failed", err);
      throw err;
    }
  },

  getByMagv: async (Magv) => {
    logger.info(`Repository: Fetching GiaoVien with MAGV ${Magv}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM GiaoVien WHERE MAGV = ?", [Magv]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByMagv failed for ${Magv}`, err);
      throw err;
    }
  },

  create: async ({ MAGV, TENGV }) => {
    logger.info(`Repository: Creating GiaoVien ${MAGV}`);
    try {
      const db = await pool;
      await db.query(
        "INSERT INTO GiaoVien (MAGV, TENGV) VALUES (?, ?)",
        [MAGV, TENGV]
      );
      return { MAGV, TENGV };
    } catch (err) {
      logger.error("Repository Error: create GiaoVien failed", err);
      throw err;
    }
  },

  update: async (Magv, { TENGV }) => {
    logger.info(`Repository: Updating GiaoVien ${Magv}`);
    try {
      const db = await pool;
      await db.query(
        "UPDATE GiaoVien SET TENGV = ? WHERE MAGV = ?",
        [TENGV, Magv]
      );
      return { MAGV: Magv, TENGV };
    } catch (err) {
      logger.error(`Repository Error: update GiaoVien failed for ${Magv}`, err);
      throw err;
    }
  },

  delete: async (Magv) => {
    logger.info(`Repository: Deleting GiaoVien ${Magv}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM GiaoVien WHERE MAGV = ?", [Magv]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete GiaoVien failed for ${Magv}`, err);
      throw err;
    }
  },
};