import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  // Khi Admin tạo user, cần set role và pass
  role_id: z.number().int().positive("Role ID must be valid"), 
  password: z.string().min(6, "Password must be at least 6 characters")
});

export function validateCreateUser(data) {
  return createUserSchema.parse(data);
}