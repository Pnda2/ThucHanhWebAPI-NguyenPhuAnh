import { z } from "zod";

export const updateProductSchema = z.object({
  name: z.string().min(1, "Product name is required").max(150, "Name khong qua 150"),
  price: z.number().positive("Price phai > 0"),
  stock: z.number().int().min(0, "Stock khong < 0"),
  is_active: z.boolean().optional().default(true), // Hoặc z.number().min(0).max(1) nếu bạn muốn gửi 0/1
});

export function validateUpdateProduct(data) {
  return updateProductSchema.parse(data);
}
