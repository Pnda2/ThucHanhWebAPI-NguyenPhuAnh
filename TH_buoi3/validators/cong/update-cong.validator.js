import { z } from "zod";

export const UpdateCongSchema = z.object({


  // Dùng .min(0) để tránh giá âm
  SLNGAYCONG: z.coerce.number({ invalid_type_error: "Số ngày công phải là số" })
  .int("Số ngày công phải là số nguyên")
  .min(0, "Số ngày công không được âm"),


});

export function validateUpdateCong(data) {
  // Hàm parse sẽ "ném ra lỗi" (throw error) nếu data không hợp lệ.
  // Bạn cần dùng try-catch ở nơi gọi hàm này.
  return UpdateCongSchema.parse(data);
}