
import { z } from "zod";

export const createOrderSchema = z.object({
  // user_id: z.number().int("User ID is required"),
  // status: z.enum(['PENDING', 'PAID', 'CANCELLED']).optional().default('PENDING'),

  items: z.array(z.object({
    product_id: z.number().int(),
    qty: z.number().int().min(1),
  })).min(1, "Order must have at least 1 item")
});

export function validateCreateOrder(data) {
  return createOrderSchema.parse(data);
}
