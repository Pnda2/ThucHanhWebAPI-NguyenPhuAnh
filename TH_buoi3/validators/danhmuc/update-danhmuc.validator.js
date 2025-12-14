import { z } from "zod";

export const UpdateDanhMucSchema = z.object({


  TenDanhMuc: z.string({ required_error: "Tên danh mục không được để trống" })
  .max(50, "Tên danh mục tối đa 50 ký tự")
  .min(1, "Tên danh mục không được để trống"), // Thêm min(1) để chặn chuỗi rỗng ""
});

export function validateUpdateDanhMuc(data) {
  // Hàm parse sẽ "ném ra lỗi" (throw error) nếu data không hợp lệ.
  // Bạn cần dùng try-catch ở nơi gọi hàm này.
  return UpdateDanhMucSchema.parse(data);
}