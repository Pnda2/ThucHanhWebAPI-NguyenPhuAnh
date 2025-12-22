import { userRepository } from "../repositories/user.repository.js";
import { UserDTO } from "../dtos/users/user.dto.js";
import { logger } from "../config/logger.js";
import bcrypt from "bcrypt"; // Bạn cần cài: npm install bcrypt

export const userService = {

  getAllUsers: async () => {
     const users = await userRepository.getAll();
     return users.map(u => new UserDTO(u));
  },
  
  getUserById: async (id) => {
     const user = await userRepository.getById(id);
     if (!user) throw new Error("User not found");
     return new UserDTO(user);
  },

  deleteUser: async (id) => {
     await userRepository.delete(id);
     return { message: "Deleted" };
  },

  createUser: async (dto) => {
    logger.info(`Service: Creating new user ${dto.email}`);
    
    // 1. Kiểm tra email tồn tại chưa
    const existing = await userRepository.getByEmail(dto.email);
    if (existing) {
      throw new Error("Email already exists");
    }

    // 2. Hash password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(dto.password, saltRounds);

    // 3. Gọi Repository
    const newUser = await userRepository.create({
      name: dto.name,
      email: dto.email,
      role_id: dto.role_id,
      password_hash: password_hash
    });

    return new UserDTO(newUser);
  },

  updateUser: async (id, dto) => {
    const updated = await userRepository.update(id, dto);
    return new UserDTO(updated);
  },
};