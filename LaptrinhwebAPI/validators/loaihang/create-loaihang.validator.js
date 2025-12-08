import { z } from "zod";

export const createLoaiHangSchema = z.object({
  MaLoai: z.number({ required_error: "MaLoai is required" }).int(),
  TenLoai: z.string({ required_error: "TenLoai is required" }).max(50),
  MoTa: z.string({ required_error: "MoTa is required" }).max(100),
})

export function validateCreateLoaiHang(data) {
  return createLoaiHangSchema.parse(data);
}