import { pool } from "../services/mysql.js";

export const employeeRepo = {
  getemployee: async () => {
    const db = await pool;
    // const result = await db.request().query("SELECT * FROM Users");
    const [rows] = await db.query("SELECT * FROM NHANVIEN");
    return rows;
  },
  //tim theo sdt
  getemployeeBySDT: async (sdt) => {
    const db = await pool;
    // const sql = "SELECT * FROM NHANVIEN WHERE SDT = ?";
    const [rows] = await db.query("SELECT * FROM NHANVIEN WHERE SDT = ?", [sdt]);
    return rows[0];
  },
  //get theo ten va sdt
    getemployeeByNameAndSDT: async (ten, sdt) => {
        const db = await pool;
        const [rows] = await db.query("SELECT * FROM NHANVIEN WHERE TENNV = ? AND SDT = ?", [ten, sdt]);
        return rows[0];
    },
  //get theo ten nhan vien, gioi tinh va sdt
    getemployeeByNameGenderAndSDT: async (ten, gioitinh, sdt) => {
        const db = await pool;
        const [rows] = await db.query("SELECT * FROM NHANVIEN WHERE TENNV = ? AND GIOITINH = ? AND SDT = ?", [ten, gioitinh, sdt]);
        return rows[0];
    },
  //post nhan vien moi
  postemployee: async (nhanvien) => {
    const db = await pool;
    const { TENNV, GIOITINH, SDT, DIACHI, NGAYSINH } = nhanvien;
    const [result] = await db.query(
      "INSERT INTO NHANVIEN (TENNV, GIOITINH, SDT, DIACHI, NGAYSINH) VALUES (?, ?, ?, ?, ?)",
      [TENNV, GIOITINH, SDT, DIACHI, NGAYSINH]
    );
    return { id: result.insertId, ...nhanvien };
  }
};