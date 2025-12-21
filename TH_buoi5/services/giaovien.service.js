import { GiaoVienRepository } from "../repositories/giaovien.repository.js";
import { GiaoVienDTO } from "../dtos/giaovien/giaovien.dto.js";
import { logger } from "../config/logger.js";

export const GiaoVienService = {
  getAll: async () => {
    logger.info("Service: Getting all GiaoVien");
    const list = await GiaoVienRepository.getAll();
    return list.map((u) => new GiaoVienDTO(u));
  },

  getByMagv: async (Magv) => {
    logger.info(`Service: Getting GiaoVien by MAGV ${Magv}`);
    const item = await GiaoVienRepository.getByMagv(Magv);
    if (!item) {
      throw new Error("GiaoVien not found");
    }
    return new GiaoVienDTO(item);
  },

  create: async (dto) => {
    logger.info(`Service: Creating new GiaoVien ${dto.MAGV}`);
    const created = await GiaoVienRepository.create(dto);
    return new GiaoVienDTO(created);
  },

  update: async (Magv, dto) => {
    logger.info(`Service: Updating GiaoVien ${Magv}`);
    const existing = await GiaoVienRepository.getByMagv(Magv);
    if (!existing) {
      throw new Error("GiaoVien not found");
    }
    const updated = await GiaoVienRepository.update(Magv, dto);
    return new GiaoVienDTO(updated);
  },

  delete: async (Magv) => {
    logger.info(`Service: Deleting GiaoVien ${Magv}`);
    const existing = await GiaoVienRepository.getByMagv(Magv);
    if (!existing) {
      throw new Error("GiaoVien not found");
    }
    await GiaoVienRepository.delete(Magv);
    return { message: "GiaoVien deleted successfully" };
  },
};