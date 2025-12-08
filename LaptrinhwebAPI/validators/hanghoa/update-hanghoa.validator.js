import { z } from "zod";

export const updateHangHoaSchema = z.object({
  MaLoai: z.number({ required_error: "MaLoai is required" }).int(),
  
  TenHang: z.string({ required_error: "TenHang is required" }).max(100),
  
  // Sửa lỗi logic SoLuong > 0
  SoLuong: z.number().int().gt(1, "Số lượng phải lớn hơn 0"), 
  
  // SoLuongCon >= 0
  SoLuongCon: z.number().int().min(0, "Số lượng còn không được âm"),
})
// Dùng refine để so sánh SoLuongCon và SoLuong
.refine((data) => data.SoLuongCon <= data.SoLuong, {
  message: "Số lượng còn lại không được lớn hơn tổng số lượng",
  path: ["SoLuongCon"], // Chỉ định lỗi sẽ hiện ở trường nào
});

export function validateUpdateHangHoa(data) {
  return updateHangHoaSchema.parse(data);
}
