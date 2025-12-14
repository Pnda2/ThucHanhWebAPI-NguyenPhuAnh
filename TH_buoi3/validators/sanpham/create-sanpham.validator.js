import { z } from "zod";

export const createSanPhamSchema = z.object({
  // Ma: Bắt buộc, tối đa 30 ký tự (Khớp với VARCHAR(30) PRIMARY KEY)
  Ma: z.string({ required_error: "Mã sản phẩm không được để trống" })
       .max(30, "Mã sản phẩm tối đa 30 ký tự")
       .min(1, "Mã sản phẩm không được để trống"), // Thêm min(1) để chặn chuỗi rỗng ""

  // Ten: Bắt buộc (Khớp với NOT NULL)
  Ten: z.string({ required_error: "Tên sản phẩm không được để trống" })
        .max(50, "Tên sản phẩm tối đa 50 ký tự"),

  // DonGia: Có thể null hoặc không gửi (Khớp với INT NULL)
  // Dùng .min(0) để tránh giá âm
  DonGia: z.number().int().min(0).nullable().optional(),

  // MaDanhMuc: Có thể null hoặc không gửi (Khớp với INT NULL)
  MaDanhMuc: z.number().int().nullable().optional(),
});

export function validateCreateSanPham(data) {
  // Hàm parse sẽ "ném ra lỗi" (throw error) nếu data không hợp lệ.
  // Bạn cần dùng try-catch ở nơi gọi hàm này.
  return createSanPhamSchema.parse(data);
}