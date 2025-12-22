import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository.js";

const SECRET_KEY = "JWT_SECRET_KEY"; 

export async function register(dto) {
  const hashedPassword = bcrypt.hashSync(dto.password, 8);
  return await userRepository.createUser({
    name: dto.name,
    email: dto.email,
    password_hash: hashedPassword,
    role_id: dto.role_id,          
  
  });
}

export async function login(email, password) {
  const user = await userRepository.getByEmail(email);
  if (!user) return null;
  const valid = bcrypt.compareSync(password, user.password_hash); 
  if (!valid) return null;
  return jwt.sign({ id: user.id, role_id: user.role_id }, SECRET_KEY, {
    expiresIn: "1h",
  });
}