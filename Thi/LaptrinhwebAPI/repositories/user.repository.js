import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const userRepository = {
  
  getAll: async () => {
    logger.info("Repository: Fetching all users");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT id, name, email, role_id, created_at FROM users");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },

  getById: async (id) => {
    logger.info(`Repository: Fetching user with ID ${id}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT id, name, email, role_id, created_at FROM users WHERE id = ?", [id]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getById failed for ID ${id}`, err);
      throw err;
    }
  },

  getByEmail: async (email) => {
    logger.info(`Repository: Fetching user by email ${email}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
      return rows[0];
    } catch (err) {
      logger.error("Repository Error: getByEmail failed", err);
      throw err;
    }
  },

  createUser: async (user) => {
    logger.info(`Repository: Registering new user ${user.email}`);
    try {
      const db = await pool;
      const [result] = await db.query(
        `INSERT INTO users (name, email, password_hash, role_id) VALUES (?, ?, ?, ?)`,
        [user.name, user.email, user.password_hash, user.role_id]
      );
      return { id: result.insertId, ...user };
    } catch (err) {
      logger.error("Repository Error: createUser failed", err);
      throw err;
    }
  },

  // Dùng cho Admin tạo User mới (Không cần password lúc đầu hoặc set default)
  create: async ({ name, email, role_id, password_hash }) => {
    logger.info(`Repository: Admin creating user ${email}`);
    try {
      const db = await pool;
      const [result] = await db.query(
        "INSERT INTO users (name, email, role_id, password_hash) VALUES (?, ?, ?, ?)",
        [name, email, role_id, password_hash]
      );
      return { id: result.insertId, name, email, role_id };
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  },

  update: async (id, { name, email, role_id }) => {
    logger.info(`Repository: Updating user ${id}`);
    try {
      const db = await pool;
      await db.query(
        "UPDATE users SET name = ?, email = ?, role_id = ? WHERE id = ?",
        [name, email, role_id, id]
      );
      return { id, name, email, role_id };
    } catch (err) {
      logger.error(`Repository Error: update failed for ID ${id}`, err);
      throw err;
    }
  },

  delete: async (id) => {
    try {
      const db = await pool;
      await db.query("DELETE FROM users WHERE id = ?", [id]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete failed for ID ${id}`, err);
      throw err;
    }
  }
};