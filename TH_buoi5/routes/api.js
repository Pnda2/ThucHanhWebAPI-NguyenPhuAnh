import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { SinhVienController } from "../controllers/sinhvien.controller.js";
import { LopHocController } from "../controllers/lophoc.controller.js";
import { GiaoVienController } from "../controllers/giaovien.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import {
  registerSchema,
  loginSchema,
} from "../validators/authens/auth.validator.js";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { POLICIES } from "../utils/constants/policies.js";
import { authorizePolicy } from "../middlewares/policy.middleware.js";

const router = Router();

// ----------------------- AUTHENTICATION & AUTHORIZATION -------------------------------------
router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

// ----------------------- USERS -------------------------------------
// Admin: xem tất cả users
router.get(
  "/users",
  authenticate,
  authorizePolicy(POLICIES.USER_VIEW_ALL),
  userController.getAll
);

// User hoặc Admin: xem chính mình
router.get(
  "/users/:id",
  authenticate,
  authorizePolicy(POLICIES.USER_VIEW_SELF),
  userController.getById
);

// Tạo user mới (chỉ Admin)
router.post(
  "/users",
  authenticate,
  authorizePolicy(POLICIES.USER_CREATE),
  userController.create
);

// Cập nhật user (Admin hoặc chính mình)
router.put(
  "/users/:id",
  authenticate,
  authorizePolicy(POLICIES.USER_UPDATE),
  userController.update
);

// Xóa user (chỉ Admin)
router.delete(
  "/users/:id",
  authenticate,
  authorizePolicy(POLICIES.USER_DELETE),
  userController.delete
);

// ----------------------- SINHVIEN -------------------------------------
// 1. Lấy thông tin theo mã (Tất cả người dùng - Admin & User)
router.get(
  "/sinhviens/:masv",
  authenticate, // Phải đăng nhập
  authorizePolicy(POLICIES.SINHVIEN_VIEW_ONE), // Kiểm tra quyền VIEW_ONE
  SinhVienController.getByMasv
);

// 2. Lấy toàn bộ danh sách (Admin & User)
router.get(
  "/sinhviens",
  authenticate,
  authorizePolicy(POLICIES.SINHVIEN_VIEW_ALL),
  SinhVienController.getAll
);

// 3. Thêm mới (Admin & User)
router.post(
  "/sinhviens",
  authenticate,
  authorizePolicy(POLICIES.SINHVIEN_CREATE),
  SinhVienController.create
);
// 4. Cập nhật (CHỈ ADMIN - )
router.put(
  "/sinhviens/:masv",
  authenticate,
  authorizePolicy(POLICIES.SINHVIEN_UPDATE),
  SinhVienController.update
);

// 5. Xóa (CHỈ ADMIN )
router.delete(
  "/sinhviens/:masv",
  authenticate,
  authorizePolicy(POLICIES.SINHVIEN_DELETE),
  SinhVienController.delete
);

// ----------------------- LOPHOC -------------------------------------

// 1. Xem danh sách (Admin & User)
router.get(
  "/LopHoc",
  authenticate,
  authorizePolicy(POLICIES.LOPHOC_VIEW_ALL),
  LopHocController.getAll
);

// 2. Xem chi tiết (Admin & User)
router.get(
  "/LopHoc/:kyhieu",
  authenticate,
  authorizePolicy(POLICIES.LOPHOC_VIEW_ONE),
  LopHocController.getByKyhieu
);

// 3. Thêm mới (Admin & User)
router.post(
  "/LopHoc",
  authenticate,
  authorizePolicy(POLICIES.LOPHOC_CREATE),
  LopHocController.create
);

// 4. Cập nhật (CHỈ ADMIN - User gọi vào bị lỗi 403)
router.put(
  "/LopHoc/:kyhieu",
  authenticate,
  authorizePolicy(POLICIES.LOPHOC_UPDATE),
  LopHocController.update
);

// 5. Xóa (CHỈ ADMIN - User gọi vào bị lỗi 403)
router.delete(
  "/LopHoc/:kyhieu",
  authenticate,
  authorizePolicy(POLICIES.LOPHOC_DELETE),
  LopHocController.delete
);

// ----------------------- GIAOVIEN -------------------------------------
// 1. Xem danh sách
router.get(
  "/GiaoVien",
  authenticate,
  authorizePolicy(POLICIES.GIAOVIEN_VIEW_ALL),
  GiaoVienController.getAll
);

// 2. Xem chi tiết
router.get(
  "/GiaoVien/:magv",
  authenticate,
  authorizePolicy(POLICIES.GIAOVIEN_VIEW_ONE),
  GiaoVienController.getByMagv
);

// 3. Thêm mới
router.post(
  "/GiaoVien",
  authenticate,
  authorizePolicy(POLICIES.GIAOVIEN_CREATE),
  GiaoVienController.create
);

// 4. Cập nhật (CHỈ ADMIN)
router.put(
  "/GiaoVien/:magv",
  authenticate,
  authorizePolicy(POLICIES.GIAOVIEN_UPDATE),
  GiaoVienController.update
);

// 5. Xóa (CHỈ ADMIN)
router.delete(
  "/GiaoVien/:magv",
  authenticate,
  authorizePolicy(POLICIES.GIAOVIEN_DELETE),
  GiaoVienController.delete
);
export default router;
