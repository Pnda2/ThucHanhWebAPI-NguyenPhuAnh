import { SinhVienRepository } from "../repositories/sinhven.repository.js";
import { SinhVienDTO } from "../dtos/sinhvien/sinhvien.dto.js";
import { logger } from "../config/logger.js";

export const SinhVienService = {
  getAll: async () => {
    logger.info("Service: Getting all SinhVien");
    const list = await SinhVienRepository.getAll();
    return list.map((u) => new SinhVienDTO(u));
  },

  getByMasv: async (Masv) => {
    logger.info(`Service: Getting SinhVien by MASV ${Masv}`);
    const item = await SinhVienRepository.getByMasv(Masv);
    if (!item) {
      logger.warn(`Service Warning: SinhVien ${Masv} not found`);
      throw new Error("SinhVien not found");
    }
    return new SinhVienDTO(item);
  },

  create: async (dto) => {
    logger.info(`Service: Creating new SinhVien ${dto.MASV}`);
    const created = await SinhVienRepository.create(dto);
    return new SinhVienDTO(created);
  },

  update: async (Masv, dto) => {
    logger.info(`Service: Updating SinhVien ${Masv}`);
    const existing = await SinhVienRepository.getByMasv(Masv);
    if (!existing) {
      throw new Error("SinhVien not found");
    }
    const updated = await SinhVienRepository.update(Masv, dto);
    return new SinhVienDTO(updated);
  },

  delete: async (Masv) => {
    logger.info(`Service: Deleting SinhVien ${Masv}`);
    const existing = await SinhVienRepository.getByMasv(Masv);
    if (!existing) {
      throw new Error("SinhVien not found");
    }
    await SinhVienRepository.delete(Masv);
    return { message: "SinhVien deleted successfully" };
  },
};