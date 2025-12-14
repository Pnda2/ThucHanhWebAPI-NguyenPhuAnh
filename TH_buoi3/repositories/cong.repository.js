import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const CongRepository = {
    //Phân công công việc cho nhân viên
    createPhanCong: async (congData) => {
        // data gồm: { MACT, MANV, SLNGAYCONG }
        const sql = `
        INSERT INTO Cong (MACT, MANV, SLNGAYCONG)
        VALUES (?, ?, ?)
        `;

        try {
            const db = await pool;
            const [result] = await db.execute(sql, [congData.MACT, congData.MANV, congData.SLNGAYCONG]);
            return result.affectedRows > 0;
        } catch (error) {
            // Xử lý lỗi trùng lặp (nếu nhân viên đã được phân công vào công trình này rồi)
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error("Nhân viên này đã được phân công vào công trình này rồi.");
            }
        throw error;
        }
    },
    //Thống kê số ngày công của nhân viên theo công trình
    getSoNgayCongByNhanVien: async (MaNV) => {
        // Kết nối 3 bảng để lấy đầy đủ thông tin
        const sql = `
        SELECT 
            nv.MANV,
            nv.HOTEN,
            ct.MACT,
            ct.TENCT,
            c.SLNGAYCONG
        FROM Cong c
        INNER JOIN NhanVien nv ON c.MANV = nv.MANV
        INNER JOIN Congtrinh ct ON c.MACT = ct.MACT
        WHERE c.MANV = ?
        `;
        const db = await pool;
        // rows sẽ là một mảng danh sách các công trình nhân viên đó làm
        const [rows] = await db.execute(sql, [MaNV]);
        return rows;
    },
 
};