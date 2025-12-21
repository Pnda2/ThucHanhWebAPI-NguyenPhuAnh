import { z } from "zod";

export const createGiaoVienSchema = z.object({
  MAGV: z.string({ required_error: "MAGV is required" }).max(10),
  TENGV: z.string({ required_error: "TENGV is required" }).max(100),
});

export function validateCreateGiaoVien(data) {
  return createGiaoVienSchema.parse(data);
}