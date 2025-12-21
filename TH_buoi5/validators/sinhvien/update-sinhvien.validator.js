import { z } from "zod";

export const updateSinhVienSchema = z.object({
  HOTEN: z.string({ required_error: "HOTEN is required" }).max(100),
});

export function validateUpdateSinhVien(data) {
  return updateSinhVienSchema.parse(data);
}