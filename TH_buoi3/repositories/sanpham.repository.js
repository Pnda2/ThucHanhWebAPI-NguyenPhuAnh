import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const SanPhamRepository = {
  // Lấy tất cả sản phẩm
  getAll: async () => {
    logger.info("Repository: Fetching all SanPham");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM SanPham");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },
  // lấy sản phẩm theo mã
  getByMa: async (Ma) => {
    logger.info(`Repository: Fetching SanPham with Ma ${Ma}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM SanPham WHERE Ma = ?", [Ma]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByMa failed for Ma ${Ma}`, err);
      throw err;
    }
  },
  //Lấy sản phẩm theo mã danh mục
  getByMaDanhMuc: async (MaDanhMuc) => {
    logger.info(`Repository: Fetching SanPham with MaDanhMuc ${MaDanhMuc}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM SanPham WHERE MaDanhMuc = ?", [MaDanhMuc]);
      return rows;
    } catch (err) {
      logger.error(`Repository Error: getByMaDanhMuc failed for MaDanhMuc ${MaDanhMuc}`, err);
      throw err;
    }
  },

  // Tạo mới sản phẩm
  create: async ({ Ma, Ten, DonGia, MaDanhMuc }) => {
    logger.info(`Repository: Creating SanPham ${Ten}`);
    try {
      const db = await pool;
      await db.query(
        "INSERT INTO SanPham (Ma, Ten, DonGia, MaDanhMuc) VALUES (?, ?, ?, ?)",
        [Ma, Ten, DonGia, MaDanhMuc]
      );
      return { Ma, Ten, DonGia, MaDanhMuc };
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  },
  // Cập nhật sản phẩm
  update: async (Ma, { Ten, DonGia, MaDanhMuc }) => {
    logger.info(`Repository: Updating SanPham ${Ma}`);
    try {
      const db = await pool;
      await db.query(
        "UPDATE SanPham SET Ten = ?, DonGia = ?, MaDanhMuc = ? WHERE Ma = ?",
        [Ten, DonGia, MaDanhMuc, Ma]
      );
      return { Ma, Ten, DonGia, MaDanhMuc };
    } catch (err) {
      logger.error(`Repository Error: update failed for Ma ${Ma}`, err);
      throw err;
    }
  },
  // Xóa sản phẩm
  delete: async (Ma) => {
    logger.info(`Repository: Deleting SanPham ${Ma}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM SanPham WHERE Ma = ?", [Ma]);
      return;
    } catch (err) {
      logger.error(`Repository Error: delete failed for Ma ${Ma}`, err);
      throw err;
    }
  },
  //Lấy sản phẩm có tên chứa chuỗi tìm kiếm
  searchByTen: async (Ten) => {
    logger.info(`Repository: Searching SanPham with Ten containing ${Ten}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM SanPham WHERE Ten LIKE ?", [
        `%${Ten}%`,
      ]);
      return rows;
    } catch (err) {
      logger.error(`Repository Error: searchByTen failed for Ten ${Ten}`, err);
      throw err;
    }
  },

  //Phân trang và sắp xếp sản phẩm
  getAllWithPagination: async (page, size, sortType) => {
    // 1. Tính toán vị trí bắt đầu (OFFSET)
    // page 1 -> offset 0
    // page 2 -> offset 10 (nếu size = 10)
    const db = await pool;
    const offset = (page - 1) * size;

    // 2. Kiểm tra hướng sắp xếp để tránh SQL Injection
    // Chỉ chấp nhận 'ASC' hoặc 'DESC', mặc định là 'ASC'
    const validSort = sortType.toUpperCase() === "DESC" ? "DESC" : "ASC";

    // 3. Query lấy dữ liệu chính
    // Lưu ý: LIMIT và OFFSET dùng để cắt dữ liệu theo trang
    const queryData = `
      SELECT s.*, d.TenDanhMuc 
      FROM SanPham s
      LEFT JOIN DanhMuc d ON s.MaDanhMuc = d.MaDanhMuc
      ORDER BY s.DonGia ${validSort}
      LIMIT ? OFFSET ?
    `;

    // 4. Query đếm tổng số bản ghi (Để FE biết có bao nhiêu trang tất cả)
    const queryCount = `SELECT COUNT(*) as total FROM SanPham`;

    try {
      // Chạy 2 câu lệnh song song cho nhanh
      const [products] = await db.query(queryData, [
        Number(size),
        Number(offset),
      ]);
      const [countResult] = await db.query(queryCount);

      const totalItems = countResult[0].total;
      const totalPages = Math.ceil(totalItems / size);

      return {
        data: products,
        pagination: {
          currentPage: Number(page),
          pageSize: Number(size),
          totalItems: totalItems,
          totalPages: totalPages,
        },
      };
    } catch (error) {
      throw error;
    }
  },

  //Thống kê số sản phẩm theo danh mục
  getThongKeDanhMuc: async () => {
    // Dùng LEFT JOIN: Để lấy cả những Danh mục chưa có sản phẩm nào (Số lượng = 0)
    // GROUP BY: Gom nhóm theo mã danh mục để đếm
    const db = await pool;
    const query = `
      SELECT 
        d.MaDanhMuc, 
        d.TenDanhMuc, 
        COUNT(s.Ma) as SoLuongSanPham
      FROM DanhMuc d
      LEFT JOIN SanPham s ON d.MaDanhMuc = s.MaDanhMuc
      GROUP BY d.MaDanhMuc, d.TenDanhMuc
      ORDER BY SoLuongSanPham DESC; 
    `;

    try {
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },
};
