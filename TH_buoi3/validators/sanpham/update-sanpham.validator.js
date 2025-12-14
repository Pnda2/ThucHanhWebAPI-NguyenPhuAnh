import { z } from "zod";

export const UpdateSanPhamSchema = z.object({
  // Ten: Bắt buộc (Khớp với NOT NULL)
  Ten: z.string({ required_error: "Tên sản phẩm không được để trống" })
        .max(50, "Tên sản phẩm tối đa 50 ký tự"),

  // DonGia: Có thể null hoặc không gửi (Khớp với INT NULL)
  // Dùng .min(0) để tránh giá âm
  DonGia: z.number().int().min(0).nullable().optional(),

  // MaDanhMuc: Có thể null hoặc không gửi (Khớp với INT NULL)
  MaDanhMuc: z.number().int().nullable().optional(),
});

export function validateUpdateSanPham(data) {
  // Hàm parse sẽ "ném ra lỗi" (throw error) nếu data không hợp lệ.
  // Bạn cần dùng try-catch ở nơi gọi hàm này.
  return UpdateSanPhamSchema.parse(data);
}