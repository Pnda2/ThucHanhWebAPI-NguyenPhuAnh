import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  role_id: z.number().int().positive().optional(),
  // Cho phép update password (optional)
  password: z.string().min(6).optional()
});

export function validateUpdateUser(data) {
  return updateUserSchema.parse(data);
}