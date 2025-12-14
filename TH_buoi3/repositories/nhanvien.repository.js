import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const NhanVienRepository = {
  //Lấy tất cả nhân viên
  getAll: async () => {
    logger.info("Repository: Fetching all NhanVien");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM NhanVien");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },
  //Lấy nhân viên theo MANV
  getNhanVienByMa: async (MaNV) => {
    logger.info(`Repository: Fetching NhanVien with MaNV=${MaNV}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM NhanVien WHERE MaNV = ?", [MaNV]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getNVbyMa failed for MaNV=${MaNV}`, err);
      throw err;
    }
  },
  //Thêm nhân viên mới
  createNhanVien: async (nhanVienData) => {
    logger.info("Repository: Creating new NhanVien");
    try {
      const db = await pool;
      const { MANV, HOTEN, NGAYSINH , PHAI, DIACHI, MAPB } = nhanVienData;
      const [result] = await db.query(
        "INSERT INTO NhanVien (MANV, HOTEN, NGAYSINH , PHAI, DIACHI, MAPB) VALUES (?, ?, ?, ?, ?, ?)",
        [MANV, HOTEN, NGAYSINH , PHAI, DIACHI, MAPB]
      );
      return { MANV, HOTEN, NGAYSINH , PHAI, DIACHI, MAPB };
    } catch (err) {
      logger.error("Repository Error: createNhanVien failed", err);
      throw err;
    }
  },
  //Cập nhật thông tin nhân viên
  updateNhanVien: async (MaNV, nhanVienData) => {
    logger.info(`Repository: Updating NhanVien with MaNV=${MaNV}`);
    try {
      const db = await pool;
      const { HOTEN, NGAYSINH , PHAI, DIACHI, MAPB } = nhanVienData;
      await db.query(
        "UPDATE NhanVien SET HOTEN = ?, NGAYSINH = ?, PHAI = ?, DIACHI = ?, MAPB = ? WHERE MANV = ?",
        [HOTEN, NGAYSINH , PHAI, DIACHI, MAPB, MaNV]
      );
      return { MANV: MaNV, HOTEN, NGAYSINH , PHAI, DIACHI, MAPB };
    } catch (err) {
      logger.error(`Repository Error: updateNhanVien failed for MaNV=${MaNV}`, err);
      throw err;
    }
  },
  //Xóa nhân viên
  deleteNhanVien: async (MaNV) => {
    logger.info(`Repository: Deleting NhanVien with MaNV=${MaNV}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM NhanVien WHERE MANV = ?", [MaNV]);
      return;
    } catch (err) {
      logger.error(`Repository Error: deleteNhanVien failed for MaNV=${MaNV}`, err);
      throw err;
    }
  },
  //Lấy nhân viên theo phòng ban
  getNhanVienByPhongBan: async (MaPB) => {
    logger.info(`Repository: Fetching NhanVien with MaPB=${MaPB}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM NhanVien WHERE MaPB = ?", [MaPB]);
      return rows;
    } catch (err) {
      logger.error(`Repository Error: getNhanVienByPhongBan failed for MaPB=${MaPB}`, err);
      throw err;
    }
  },
 
};