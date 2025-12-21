import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const SinhVienRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all SinhVien");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM SinhVien");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll SinhVien failed", err);
      throw err;
    }
  },

  getByMasv: async (Masv) => {
    logger.info(`Repository: Fetching SinhVien with MASV ${Masv}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM SinhVien WHERE MASV = ?", [Masv]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByMasv failed for ${Masv}`, err);
      throw err;
    }
  },

  create: async ({ MASV, HOTEN }) => {
    logger.info(`Repository: Creating SinhVien ${MASV}`);
    try {
      const db = await pool;
      await db.query(
        "INSERT INTO SinhVien (MASV, HOTEN) VALUES (?, ?)",
        [MASV, HOTEN]
      );
      return { MASV, HOTEN };
    } catch (err) {
      logger.error("Repository Error: create SinhVien failed", err);
      throw err;
    }
  },

  update: async (Masv, { HOTEN }) => {
    logger.info(`Repository: Updating SinhVien ${Masv}`);
    try {
      const db = await pool;
      await db.query(
        "UPDATE SinhVien SET HOTEN = ? WHERE MASV = ?",
        [HOTEN, Masv]
      );
      return { MASV: Masv, HOTEN };
    } catch (err) {
      logger.error(`Repository Error: update SinhVien failed for ${Masv}`, err);
      throw err;
    }
  },

  delete: async (Masv) => {
    logger.info(`Repository: Deleting SinhVien ${Masv}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM SinhVien WHERE MASV = ?", [Masv]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete SinhVien failed for ${Masv}`, err);
      throw err;
    }
  },
};