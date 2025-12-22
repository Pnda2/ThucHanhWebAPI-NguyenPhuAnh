import { z } from "zod";

export const getOrderQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  
  status: z.enum([
    "PENDING", 
    "PAID",       
    "CANCELLED", 
    "SHIPPING", 
    "COMPLETED"
  ]).optional(),
});

export function validateGetOrderQuery(query) {
  return getOrderQuerySchema.parse(query);
}