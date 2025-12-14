import { Router } from "express";
import { SanPhamController } from "../controllers/sanpham.controller.js";
import { DanhMucController } from "../controllers/danhmuc.controller.js";
import { NhanVienController } from "../controllers/nhanvien.controller.js";
import { CongController } from "../controllers/cong.controller.js";
import { CongTrinhController } from "../controllers/congtrinh.controller.js";
import { PhongBanController } from "../controllers/phongban.controller.js";

const router = Router();

// SanPham routes
router.get("/thongke/sanpham-danhmuc", SanPhamController.getThongKeDanhMuc);
router.get("/sanpham", SanPhamController.getAllSanPham);
router.get("/sanpham/phantrang", SanPhamController.getAllWithPagination); //GET /api2/sanpham/phantrang?page={page}&size={size}&sort=donGia,asc|desc

router.get("/sanpham/timkiem", SanPhamController.searchByTen); //GET /api2/sanpham/search?Ten={ten}
router.get("/sanpham/:Ma", SanPhamController.getSanPhamByMa);
router.get(
  "/danhmuc/:MaDanhMuc/sanpham",
  SanPhamController.getSanPhamByMaDanhMuc
);
router.post("/sanpham", SanPhamController.createSanPham);
router.put("/sanpham/:Ma", SanPhamController.updateSanPham);
router.delete("/sanpham/:Ma", SanPhamController.deleteSanPham);

// DanhMuc routes
router.get("/danhmuc", DanhMucController.getAllDanhMuc);

/*----------------------Quản lý Nhân viên------------------- */
// NhanVien routes
router.get("/nhanvien", NhanVienController.getAllNhanVien);
router.get(
  "/phongban/:MaPB/nhanvien",
  NhanVienController.getNhanVienByPhongBan
);
router.get("/nhanvien/:MaNV", NhanVienController.getNhanVienByMa);
router.post("/nhanvien", NhanVienController.createNhanVien);
router.put("/nhanvien/:MaNV", NhanVienController.updateNhanVien);
router.delete("/nhanvien/:MaNV", NhanVienController.deleteNhanVien);

// PhongBan routes
router.get("/phongban", PhongBanController.getAllPhongBan);

// CongTrinh routes
router.get("/congtrinh", CongTrinhController.getAllCongTrinh);

// Cong routes
router.post("/cong", CongController.phanCong);
router.get("/thongke/nhanvien/:manv/ngaycong", CongController.thongKe);

export default router;
