import { z } from "zod";

export const createCongSchema = z.object({

  MACT: z.string({ required_error: "Mã công trình không được để trống" })
       .max(10, "Mã công trình tối đa 10 ký tự")
       .min(1, "Mã công trình không được để trống"), // Thêm min(1) để chặn chuỗi rỗng ""

  MANV: z.string({ required_error: "Mã nhân viên không được để trống" })
        .max(10, "Mã nhân viên tối đa 10 ký tự")
        .min(1, "Mã nhân viên không được để trống"), // Thêm min(1) để chặn chuỗi rỗng ""

  // Dùng .min(0) để tránh giá âm
  SLNGAYCONG: z.coerce.number({ invalid_type_error: "Số ngày công phải là số" })
  .int("Số ngày công phải là số nguyên")
  .min(0, "Số ngày công không được âm"),


});

export function validateCreateCong(data) {
  // Hàm parse sẽ "ném ra lỗi" (throw error) nếu data không hợp lệ.
  // Bạn cần dùng try-catch ở nơi gọi hàm này.
  return createCongSchema.parse(data);
}