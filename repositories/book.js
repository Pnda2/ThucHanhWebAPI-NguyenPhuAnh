import { pool } from "../services/mysql.js";

export const bookRepo = {
  //get tat ca sach
  getbooks: async () => {
    const db = await pool;
    // const result = await db.request().query("SELECT * FROM Users");
    const [rows] = await db.query("SELECT * FROM SACH");
    return rows;
  },
  //get sach chua ten sach
  getbookByTensach: async (tsach) => {
    const db = await pool;
    const [rows] = await db.query("SELECT * FROM SACH WHERE TENSACH LIKE ?", [
      `%${tsach}%`,
    ]);
    return rows;
  },
  //get sach theo ten tac gia
  getbookByTacgia: async (tgia) => {
    const db = await pool;
    const [rows] = await db.query("SELECT * FROM SACH WHERE TACGIA = ?", [
      tgia,
    ]);
    return rows;
  },
  //get sach theo ten NXB
  getbookByNhaXB: async (nhaxb) => {
    const db = await pool;
    const [rows] = await db.query("SELECT * FROM SACH WHERE NHAXB = ?", [
      nhaxb,
    ]);
    return rows;
  },
  //get cac cuon sach moi (5 nam tinh tu hien tai)
  getNewBooks: async () => {
    const db = await pool;
    
    // Lấy năm hiện tại
    const currentYear = new Date().getFullYear();
    // Trừ đi 5 năm để xác định giới hạn năm xuất bản
    const limitYear = currentYear - 5;

    const [rows] = await db.query("SELECT * FROM SACH WHERE NAMXB >= ?", [limitYear]);
    return rows;
  },
};
