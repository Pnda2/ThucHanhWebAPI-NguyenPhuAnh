import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const LopHocRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all LopHoc");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM LopHoc");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll LopHoc failed", err);
      throw err;
    }
  },

  getByKyhieu: async (Kyhieu) => {
    logger.info(`Repository: Fetching LopHoc with KYHIEU ${Kyhieu}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM LopHoc WHERE KYHIEU = ?", [Kyhieu]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByKyhieu failed for ${Kyhieu}`, err);
      throw err;
    }
  },

  create: async ({ KYHIEU, TENMONHOC, THOIGIAN }) => {
    logger.info(`Repository: Creating LopHoc ${KYHIEU}`);
    try {
      const db = await pool;
      await db.query(
        "INSERT INTO LopHoc (KYHIEU, TENMONHOC, THOIGIAN) VALUES (?, ?, ?)",
        [KYHIEU, TENMONHOC, THOIGIAN]
      );
      return { KYHIEU, TENMONHOC, THOIGIAN };
    } catch (err) {
      logger.error("Repository Error: create LopHoc failed", err);
      throw err;
    }
  },

  update: async (Kyhieu, { TENMONHOC, THOIGIAN }) => {
    logger.info(`Repository: Updating LopHoc ${Kyhieu}`);
    try {
      const db = await pool;
      await db.query(
        "UPDATE LopHoc SET TENMONHOC = ?, THOIGIAN = ? WHERE KYHIEU = ?",
        [TENMONHOC, THOIGIAN, Kyhieu]
      );
      return { KYHIEU: Kyhieu, TENMONHOC, THOIGIAN };
    } catch (err) {
      logger.error(`Repository Error: update LopHoc failed for ${Kyhieu}`, err);
      throw err;
    }
  },

  delete: async (Kyhieu) => {
    logger.info(`Repository: Deleting LopHoc ${Kyhieu}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM LopHoc WHERE KYHIEU = ?", [Kyhieu]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete LopHoc failed for ${Kyhieu}`, err);
      throw err;
    }
  },
};