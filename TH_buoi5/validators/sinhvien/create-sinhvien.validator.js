import { z } from "zod";

export const createSinhVienSchema = z.object({
  MASV: z.string({ required_error: "MASV is required" }).max(10),
  HOTEN: z.string({ required_error: "HOTEN is required" }).max(100),
});

export function validateCreateSinhVien(data) {
  return createSinhVienSchema.parse(data);
}