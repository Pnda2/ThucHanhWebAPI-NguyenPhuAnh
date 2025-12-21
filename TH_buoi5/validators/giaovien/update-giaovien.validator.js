import { z } from "zod";

export const updateGiaoVienSchema = z.object({
  TENGV: z.string({ required_error: "TENGV is required" }).max(100),
});

export function validateUpdateGiaoVien(data) {
  return updateGiaoVienSchema.parse(data);
}