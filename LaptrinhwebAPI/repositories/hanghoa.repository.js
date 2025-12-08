import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const HangHoaRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all HangHoa");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM HangHoa");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },

  getByMaloai: async (Maloai) => {
    logger.info(`Repository: Fetching HangHoa with ID ${id}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM HangHoa WHERE Maloai = ?", [Maloai]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByMaloai failed for ID ${Maloai}`, err);
      throw err;
    }
  },

  //create hang hoa
  create: async ({ MaHang, MaLoai, TenHang, SoLuong ,SoLuongCon}) => {
    logger.info(`Repository: Creating HangHoa ${TenHang}`);
    try {
      const db = await pool;
      await db.query(
        "INSERT INTO HangHoa (MaHang, MaLoai, TenHang, SoLuong ,SoLuongCon) VALUES (?, ?, ?, ?, ?)",
        [MaHang, MaLoai, TenHang, SoLuong ,SoLuongCon]
      );
      return { MaHang, MaLoai, TenHang, SoLuong ,SoLuongCon };
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  },

  //update hang hoa
  update: async (MaHang, { MaLoai, TenHang, SoLuong ,SoLuongCon }) => {
    logger.info(`Repository: Updating HangHoa ${MaHang}`);
    try {
      const db = await pool;
      await db.query(
        "UPDATE HangHoa SET MaLoai = ?, TenHang = ?, SoLuong = ? , SoLuongCon = ? WHERE MaHang = ?",
        [MaLoai, TenHang, SoLuong ,SoLuongCon, MaHang]
      );
      return { MaHang, MaLoai, TenHang, SoLuong ,SoLuongCon };
    } catch (err) {
      logger.error(`Repository Error: update failed for MaHang ${MaHang}`, err);
      throw err;
    }
  },

  //delete hang hoa
  delete: async (MaHang) => {
    logger.info(`Repository: Deleting HangHoa ${MaHang}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM HangHoa WHERE MaHang = ?", [MaHang]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete failed for MaHang ${MaHang}`, err);
      throw err;
    }
  },

  // get hang hoa by TenHang
  getByTenloai: async (Tenloai) => {
    logger.info(`Repository: Fetching HangHoa with Name ${Tenloai}`);
    try {
      const db = await pool;
      const [rows] = await db.query("select * from HangHoa inner join loaihang on HangHoa.MaLoai = loaihang.MaLoai where loaihang.TenLoai = ?", [Tenloai]);
      return rows;
    } catch (err) {
      logger.error(`Repository Error: getByTenloai failed for Name ${Tenloai}`, err);
      throw err;
    }
  },

  //get hang hoa co so luong con < 5
  getBySLC: async () => {
    logger.info("Repository: Hang hoa voi so luong con < 5");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM HangHoa WHERE SoLuongCon < 5");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getBySLC failed", err);
      throw err;
    }
  },

  //get thong tin hang hoa co gia ban con kha dung
  getByGiaBanKD: async () => {
    logger.info("Repository: Hang hoa co gia ban con kha dung");
    try {
      const db = await pool;
      const [rows] = await db.query(" SELECT h.*, g.Gia FROM HangHoa h JOIN GiaBan g ON h.MaHang = g.MaHang AND CURDATE() BETWEEN g.NgayBD AND g.NgayKT");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getByGiaBanKD failed", err);
      throw err;
    }
  },

  //get thong tin hang hoa co gia ban con kha dung trong khoang gia
  getByKhoangGia: async (min, max) => {
    logger.info(`Repository: Hang hoa co gia ban trong khoang ${min} - ${max}`);
    try {
      const db = await pool;
      const [rows] = await db.query(" SELECT h.*, g.Gia FROM HangHoa h JOIN GiaBan g ON h.MaHang = g.MaHang AND CURDATE() BETWEEN g.NgayBD AND g.NgayKT AND g.Gia >= ? AND g.Gia <= ?", [min, max]);
      return rows;
    } catch (err) {
      logger.error("Repository Error: getByKhoangGia failed", err);
      throw err;
    }
  },
};