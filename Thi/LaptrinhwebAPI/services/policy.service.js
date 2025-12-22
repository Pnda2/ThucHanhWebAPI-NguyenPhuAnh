import { rolePolicyMap } from "../config/rolePolicyMap.js";
import { POLICIES } from "../utils/constants/policies.js";

export async function checkPolicy({ user, policy, resourceId = null }) {

  const userPolicies = rolePolicyMap[user.role_id] || [];

  // Nếu không có quyền trong danh sách -> Chặn ngay
  if (!userPolicies.includes(policy)) {
    return false;
  }

  // --- KIỂM TRA NGỮ CẢNH (Context check) ---
  
  // 1. User chỉ được xem/sửa chính mình
  if (policy === POLICIES.USER_VIEW_SELF || policy === POLICIES.USER_UPDATE) {
    // Admin (role_id=1) được làm hết, User thường phải check ID
    if (user.role_id === 1) return true;
    return user.id === Number(resourceId);
  }

  return true;
}