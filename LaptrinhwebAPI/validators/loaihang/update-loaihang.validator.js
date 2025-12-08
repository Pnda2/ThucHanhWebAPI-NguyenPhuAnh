import { z } from "zod";

export const updateLoaiHangSchema = z.object({
  TenLoai: z.string({ required_error: "TenLoai is required" }).max(50),
  MoTa: z.string({ required_error: "MoTa is required" }).max(100),
})

export function validateUpdateLoaiHang(data) {
  return updateLoaiHangSchema.parse(data);
}