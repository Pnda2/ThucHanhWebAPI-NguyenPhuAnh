import { LopHocRepository } from "../repositories/lophoc.repository.js";
import { LopHocDTO } from "../dtos/lophoc/lophoc.dto.js";
import { logger } from "../config/logger.js";

export const LopHocService = {
  getAll: async () => {
    logger.info("Service: Getting all LopHoc");
    const list = await LopHocRepository.getAll();
    return list.map((u) => new LopHocDTO(u));
  },

  getByKyhieu: async (Kyhieu) => {
    logger.info(`Service: Getting LopHoc by KYHIEU ${Kyhieu}`);
    const item = await LopHocRepository.getByKyhieu(Kyhieu);
    if (!item) {
      throw new Error("LopHoc not found");
    }
    return new LopHocDTO(item);
  },

  create: async (dto) => {
    logger.info(`Service: Creating new LopHoc ${dto.KYHIEU}`);
    const created = await LopHocRepository.create(dto);
    return new LopHocDTO(created);
  },

  update: async (Kyhieu, dto) => {
    logger.info(`Service: Updating LopHoc ${Kyhieu}`);
    const existing = await LopHocRepository.getByKyhieu(Kyhieu);
    if (!existing) {
      throw new Error("LopHoc not found");
    }
    const updated = await LopHocRepository.update(Kyhieu, dto);
    return new LopHocDTO(updated);
  },

  delete: async (Kyhieu) => {
    logger.info(`Service: Deleting LopHoc ${Kyhieu}`);
    const existing = await LopHocRepository.getByKyhieu(Kyhieu);
    if (!existing) {
      throw new Error("LopHoc not found");
    }
    await LopHocRepository.delete(Kyhieu);
    return { message: "LopHoc deleted successfully" };
  },
};