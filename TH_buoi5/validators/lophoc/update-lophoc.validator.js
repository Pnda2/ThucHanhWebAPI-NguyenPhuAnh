import { z } from "zod";

export const updateLopHocSchema = z.object({
  TENMONHOC: z.string({ required_error: "TENMONHOC is required" }).max(100),
  THOIGIAN: z.string({ required_error: "THOIGIAN is required" }).max(50),
});

export function validateUpdateLopHoc(data) {
  return updateLopHocSchema.parse(data);
}