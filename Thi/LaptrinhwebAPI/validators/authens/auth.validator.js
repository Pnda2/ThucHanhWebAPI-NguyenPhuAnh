import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role_id: z.number().int().positive().default(2) 
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});