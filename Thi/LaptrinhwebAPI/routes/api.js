import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  registerSchema,
  loginSchema,
} from "../validators/authens/auth.validator.js";
import { productController } from "../controllers/product.controller.js";
import { orderController } from "../controllers/order.controller.js";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { POLICIES } from "../utils/constants/policies.js";
import { authorizePolicy } from "../middlewares/policy.middleware.js";

const router = Router();

// ----------------------- AUTHENTICATION & AUTHORIZATION -------------------------------------
router.post("/auth/register", validate(registerSchema), registerUser);
router.post("/auth/login", validate(loginSchema), loginUser);

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

// ----------------------- PRODUCTS -------------------------------------
//xem danh sách sản phẩm đang bán (lọc theo keyword, sort theo giá)
router.get(
  "/products", //GET api/products?search=&sort=price_asc|price_desc
  authenticate,
  authorizePolicy(POLICIES.PRODUCT_VIEW),
  productController.getAll
);
// ----------------------- ORDERS -------------------------------------
//tạo đơn hàng cho user đăng nhập
router.post(
  "/orders", 
  authenticate,
  authorizePolicy(POLICIES.ORDER_CREATE),
  orderController.create
);
//xem lịch sử đơn hàng của chính mình(lọc theo trạng thái, phân trang)
router.get(
  "/orders/my", 
  authenticate,
  authorizePolicy(POLICIES.ORDER_VIEW_SELF), // Dùng policy xem chính mình
  orderController.getHistory
);
export default router;
