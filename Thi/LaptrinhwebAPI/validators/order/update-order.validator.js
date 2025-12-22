import { z } from "zod";

export const updateOrderSchema = z.object({
  status: z.enum(['PENDING', 'PAID', 'CANCELLED'], {
    errorMap: () => ({ message: "Status must be PENDING, PAID, or CANCELLED" })
  }).optional(),
  user_id: z.number().int().positive().optional(),

  created_at: z.string().datetime({ message: "Invalid datetime format" }).optional(),
});

export function validateUpdateOrder(data) {
  return updateOrderSchema.parse(data);
}