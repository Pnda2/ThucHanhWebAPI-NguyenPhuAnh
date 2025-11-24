
import { pool } from "../services/mysql.js";

export const studentRepo = {
    //get tat ca sinh vien
    getstudents: async () => {
        const db = await pool;
        const [rows] = await db.query("SELECT * FROM SINHVIEN");
        return rows;
    },
    //cac sinh vien co dia chi chua tham so DiaChi
    getstudentByDiaChi: async (diachi) => {
        const db = await pool;
        const [rows] = await db.query("SELECT * FROM SINHVIEN WHERE DIACHI LIKE ?", [
            `%${diachi}%`,
        ]);
        return rows;
    },
    //cac sinh vien co ten chua tham so TenSV
    getstudentByTenSV: async (tensv) => {
        const db = await pool;
        const [rows] = await db.query("SELECT * FROM SINHVIEN WHERE TENSV LIKE ?", [
            `%${tensv}%`,
        ]);
        return rows;
    },
    //get các sinh viên trên 20 tuổi (có năm hiện tại - năm sinh (lấy từ ngày sinh)>=20)
    getstudentsOver20: async () => {
        const db = await pool;

        // Lấy năm hiện tại
        const currentYear = new Date().getFullYear();
        // Tính năm sinh tối đa để sinh viên trên 20 tuổi
        const maxBirthYear = currentYear - 20;

        const [rows] = await db.query("SELECT * FROM SINHVIEN WHERE YEAR(NGAYSINH) < ?", [maxBirthYear]);
        return rows;
    },
};