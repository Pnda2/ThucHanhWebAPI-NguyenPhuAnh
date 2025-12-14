import { z } from "zod";

export const UpdateNhanVienSchema = z.object({


  HOTEN: z.string({ required_error: "Họ tên không được để trống" })
    .trim()
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(100, "Họ tên tối đa 100 ký tự"),

  // Ép kiểu chuỗi sang Date
  NGAYSINH: z.coerce.date({
    required_error: "Ngày sinh không được để trống",
    invalid_type_error: "Ngày sinh không hợp lệ"
  }),

  // Có thể dùng .string() thường, nhưng dùng .enum() sẽ an toàn dữ liệu hơn
  PHAI: z.enum(["Nam", "Nữ", "Khác"], {
    errorMap: () => ({ message: "Giới tính phải là: Nam, Nữ hoặc Khác" })
  }),

  DIACHI: z.string()
    .trim()
    .max(200, "Địa chỉ tối đa 200 ký tự")
    .optional() // Cho phép không nhập (undefined)
    .or(z.literal("")), // Cho phép nhập chuỗi rỗng ""

  MAPB: z.string({ required_error: "Phòng ban không được để trống" })
    .trim()
    .min(1, "Vui lòng chọn phòng ban")
    .max(10, "Mã phòng ban tối đa 10 ký tự"),
})
// Logic nghiệp vụ: Kiểm tra nhân viên phải đủ 18 tuổi
.refine((data) => {
  if (!data.NGAYSINH) return true;
  
  const today = new Date();
  const birthDate = new Date(data.NGAYSINH);
  
  // Tính tuổi
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  
  // Điều chỉnh nếu chưa tới sinh nhật trong năm nay
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age >= 18;
}, {
  message: "Nhân viên phải đủ 18 tuổi",
  path: ["NGAYSINH"], // Hiển thị lỗi ngay tại trường Ngày sinh
});

export function validateUpdateNhanVien(data) {
  return UpdateNhanVienSchema.parse(data);
}

// export function safeValidateCreateNhanVien(data) {
//   const result = createNhanVienSchema.safeParse(data);
//   if (!result.success) {
//     return { success: false, errors: result.error.format() };
//   }
//   return { success: true, data: result.data };
// }