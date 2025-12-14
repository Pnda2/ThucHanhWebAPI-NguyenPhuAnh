import { NhanVienRepository } from "../repositories/nhanvien.repository.js";
import { NhanVienDTO } from "../dtos/nhanvien/nhanvien.dto.js";
import { logger } from "../config/logger.js";

export const NhanVienService = {
  // Lấy tất cả nhân viên
  getAll: async () => {
    logger.info("Service: Fetching all NhanVien");
    try {
      const nhanViens = await NhanVienRepository.getAll();
      return nhanViens.map(nv => new NhanVienDTO(nv));
    } catch (err) {
      logger.error("Service Error: getAll failed", err);
      throw err;
    }
  },
  // Lấy nhân viên theo MANV
  getNhanVienByMa: async (MaNV) => {
    logger.info(`Service: Fetching NhanVien with MaNV=${MaNV}`);
    try {
      const nhanVien = await NhanVienRepository.getNhanVienByMa(MaNV);
      return new NhanVienDTO(nhanVien);
    } catch (err) {
      logger.error(`Service Error: getNhanVienByMa failed for MaNV=${MaNV}`, err);
      throw err;
    }
  },
  // Thêm nhân viên mới
  createNhanVien: async (nhanVienData) => {
    logger.info("Service: Creating new NhanVien");
    try {
      const newNhanVien = await NhanVienRepository.createNhanVien(nhanVienData);
      return new NhanVienDTO(newNhanVien);
    } catch (err) {
      logger.error("Service Error: createNhanVien failed", err);
      throw err;
    }
  },
  // Cập nhật thông tin nhân viên
  updateNhanVien: async (MaNV, nhanVienData) => {
    logger.info(`Service: Updating NhanVien with MaNV=${MaNV}`);
    try {
      const updatedNhanVien = await NhanVienRepository.updateNhanVien(MaNV, nhanVienData);
      return new NhanVienDTO(updatedNhanVien);
    } catch (err) {
      logger.error(`Service Error: updateNhanVien failed for MaNV=${MaNV}`, err);
      throw err;
    }
  },
  // Xoá nhân viên
  deleteNhanVien: async (MaNV) => {
    logger.info(`Service: Deleting NhanVien with MaNV=${MaNV}`);
    try {
      await NhanVienRepository.deleteNhanVien(MaNV);
      return { message: `NhanVien with MaNV=${MaNV} deleted successfully` };
    } catch (err) {
      logger.error(`Service Error: deleteNhanVien failed for MaNV=${MaNV}`, err);
      throw err;
    }
  },
  // Lấy nhân viên theo phòng ban
  getNhanVienByPhongBan: async (MaPB) => {
    logger.info(`Service: Fetching NhanVien with MaPB=${MaPB}`);
    try {
      const nhanViens = await NhanVienRepository.getNhanVienByPhongBan(MaPB);
      return nhanViens.map(nv => new NhanVienDTO(nv));
    } catch (err) {
      logger.error(`Service Error: getNhanVienByPhongBan failed for MaPB=${MaPB}`, err);
      throw err;
    }
  },

};
