import { z } from "zod";

export const createCongTrinhSchema = z.object({
  MACT: z.string({ required_error: "Mã công trình không được để trống" })
    .trim()
    .min(1, "Mã công trình không được để trống")
    .max(10, "Mã công trình tối đa 10 ký tự"),

  TENCT: z.string({ required_error: "Tên công trình không được để trống" })
    .trim()
    .min(1, "Tên công trình không được để trống")
    .max(200, "Tên công trình tối đa 200 ký tự"),

  DIADIEM: z.string()
    .trim()
    .max(200, "Địa điểm tối đa 200 ký tự")
    .optional(), // Có thể để trống nếu chưa xác định địa điểm

  // Dùng coerce.date() để nhận chuỗi "2023-10-20" và chuyển thành Date object
  NGAYCAPGP: z.coerce.date({
    required_error: "Ngày cấp giấy phép không được để trống",
    invalid_type_error: "Định dạng ngày cấp giấy phép không hợp lệ"
  }),

  NGAYKC: z.coerce.date({
    required_error: "Ngày khởi công không được để trống",
    invalid_type_error: "Định dạng ngày khởi công không hợp lệ"
  }),
})
// Validate logic nâng cao: Ngày Khởi công (KC) phải >= Ngày Cấp giấy phép (GP)
.refine((data) => {
  // Chỉ so sánh nếu cả 2 ngày đều tồn tại
  if (data.NGAYKC && data.NGAYCAPGP) {
    return data.NGAYKC >= data.NGAYCAPGP;
  }
  return true;
}, {
  message: "Ngày khởi công phải sau hoặc bằng ngày cấp giấy phép",
  path: ["NGAYKC"], // Lỗi sẽ được gán vào trường NGAYKC để hiển thị ở FE
});

// Hàm validate trả về data hoặc throw error
export function validateCreateCongTrinh(data) {
  return createCongTrinhSchema.parse(data);
}

// // Hàm validate an toàn (Khuyên dùng)
// export function safeValidateCreateCongTrinh(data) {
//   const result = createCongTrinhSchema.safeParse(data);
//   if (!result.success) {
//     return { success: false, errors: result.error.format() };
//   }
//   return { success: true, data: result.data };
// }