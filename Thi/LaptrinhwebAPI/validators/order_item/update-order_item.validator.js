import { z } from "zod";

export const updateOrderItemSchema = z.object({

  qty: z.number().int().min(1).optional(),
  product_id: z.number().int().optional(),
});

export function validateUpdateOrderItem(data) {
  return updateOrderItemSchema.parse(data);
}