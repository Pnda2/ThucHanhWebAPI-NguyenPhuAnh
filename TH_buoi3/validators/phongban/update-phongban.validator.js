import { z } from "zod";

export const UpdatePhongBanSchema = z.object({


  TENPB: z.string({ required_error: "Tên phòng ban không được để trống" })
    .trim()
    .min(1, "Tên phòng ban không được để trống")
    .max(100, "Tên phòng ban tối đa 100 ký tự"),
});

// Hàm validate (Throw error)
export function validateUpdatePhongBan(data) {
  return UpdatePhongBanSchema.parse(data);
}

