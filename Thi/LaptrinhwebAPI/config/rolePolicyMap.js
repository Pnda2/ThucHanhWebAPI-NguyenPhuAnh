import { POLICIES } from "../utils/constants/policies.js";

export const rolePolicyMap = {
  // --- QUYỀN CỦA ADMIN (ID: 1) ---
  1: [
    POLICIES.USER_VIEW_ALL,
    POLICIES.USER_VIEW_SELF,
    POLICIES.USER_CREATE,
    POLICIES.USER_UPDATE,
    POLICIES.USER_DELETE,
    POLICIES.ORDER_CREATE, // Admin cũng có thể tạo đơn (nếu muốn)
    POLICIES.PRODUCT_VIEW,
    POLICIES.ORDER_VIEW_SELF,
  ],

  // --- QUYỀN CỦA USER (ID: 2) ---
  3: [
    POLICIES.USER_VIEW_SELF, // Xem chính mình
    POLICIES.USER_UPDATE,    // Sửa chính mình
    POLICIES.ORDER_CREATE,
    POLICIES.PRODUCT_VIEW,   //  User được tạo đơn hàng
    POLICIES.ORDER_VIEW_SELF,
  ],
};