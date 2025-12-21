import { z } from "zod";

export const createLopHocSchema = z.object({
  KYHIEU: z.string({ required_error: "KYHIEU is required" }).max(10),
  TENMONHOC: z.string({ required_error: "TENMONHOC is required" }).max(100),
  THOIGIAN: z.string({ required_error: "THOIGIAN is required" }).max(50),
});

export function validateCreateLopHoc(data) {
  return createLopHocSchema.parse(data);
}