import { z } from "zod";
export const updateGiaBanSchema = z.object({
    MaHang: z.coerce.number({ required_error: "MaHang is required" }).int(),
    Gia: z.coerce.number({ required_error: "Gia is required" }).min(0, "Gia phai >= 0"),
    DVTinh: z.string().max(20).optional(), // DVTinh có thể null hoặc không gửi
    // coerce.date giúp chuyển chuỗi "2024-01-01" thành đối tượng Date
    NgayBD: z.coerce.date({ required_error: "Ngay bat đau is required" }),
    NgayKT: z.coerce.date({ required_error: "Ngay ket thuc is required" }),
  })
  .refine(
    (data) => data.NgayKT >= data.NgayBD,
    {
      message: "Ngày kết thúc phải sau hoặc bằng ngày bắt đầu",
      path: ["NgayKT"],
    }
  );

  export function validateUpdateGiaBan(data) {
    return updateGiaBanSchema.parse(data);
  }