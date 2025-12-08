import { z } from "zod";

export const createHangHoaSchema = z.object({
  MaHang: z.number({ required_error: "MaHang is required" }),
  MaLoai: z.number({ required_error: "MaLoai is required" }).int(),
  TenHang: z.string({ required_error: "TenHang is required" }).max(100),

  SoLuong: z.number().int().min(1, "SoLuong must be > 0"),

  SoLuongCon: z.number().int().min(0, "SoLuongCon must be >= 0")
})
.refine(data => data.SoLuongCon <= data.SoLuong, {
  message: "Số lượng còn lại không được lớn hơn tổng số lượng",
  path: ["SoLuongCon"],
});

export function validateCreateHangHoa(data) {
  return createHangHoaSchema.parse(data);
}