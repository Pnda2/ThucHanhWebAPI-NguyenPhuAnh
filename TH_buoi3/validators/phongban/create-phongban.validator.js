import { z } from "zod";

export const createPhongBanSchema = z.object({
  MAPB: z.string({ required_error: "Mã phòng ban không được để trống" })
    .trim() // Quan trọng: Loại bỏ khoảng trắng thừa (VD: " PB01 " -> "PB01")
    .min(1, "Mã phòng ban không được để trống")
    .max(10, "Mã phòng ban tối đa 10 ký tự"),

  TENPB: z.string({ required_error: "Tên phòng ban không được để trống" })
    .trim()
    .min(1, "Tên phòng ban không được để trống")
    .max(100, "Tên phòng ban tối đa 100 ký tự"),
});

// Hàm validate (Throw error)
export function validateCreatePhongBan(data) {
  return createPhongBanSchema.parse(data);
}

// // Hàm validate an toàn (Trả về object success/error)
// export function safeValidateCreatePhongBan(data) {
//   const result = createPhongBanSchema.safeParse(data);
//   if (!result.success) {
//     return { success: false, errors: result.error.format() };
//   }
//   return { success: true, data: result.data };
// }