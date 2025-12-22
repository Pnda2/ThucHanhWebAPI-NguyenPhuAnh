import { z } from "zod";

export const createOrderItemSchema = z.object({
  order_id: z.number().int("Order ID is required"),
  product_id: z.number().int("Product ID is required"),
  qty: z.number().int().min(1, "Quantity must be at least 1"),
});

export function validateCreateOrderItem(data) {
  return createOrderItemSchema.parse(data);
}
