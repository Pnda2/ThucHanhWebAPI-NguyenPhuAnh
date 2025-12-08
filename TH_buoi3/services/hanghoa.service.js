import { HangHoaRepository } from "../repositories/hanghoa.repository.js";
import { HangHoaDTO } from "../dtos/hanghoa/hanghoa.dto.js";
import { logger } from "../config/logger.js";

export const HangHoaService = {
  getAllHangHoas: async () => {
    logger.info("Service: Getting all HangHoas");
    const HangHoas = await HangHoaRepository.getAll();
    return HangHoas.map((u) => new HangHoaDTO(u));
  },

  getHangHoaByMaloai: async (MaLoai) => {
    logger.info(`Service: Getting HangHoa by MaLoai ${MaLoai}`);
    const HangHoa = await HangHoaRepository.getByMaloai(MaLoai);

    if (!HangHoa) {
      logger.warn(`Service Warning: HangHoa ${MaLoai} not found`);
      throw new Error("HangHoa not found");
    }

    return new HangHoaDTO(HangHoa);
  },

  createHangHoa: async (dto) => {
    logger.info(`Service: Creating new HangHoa ${dto.email}`);
    const created = await HangHoaRepository.create(dto);
    return new HangHoaDTO(created);
  },

  updateHangHoa: async (id, dto) => {
    logger.info(`Service: Updating HangHoa ${id}`);

    const existing = await HangHoaRepository.getByMaloai(id);
    if (!existing) {
      logger.warn(`Service Warning: Cannot update. HangHoa ${id} not found`);
      throw new Error("HangHoa not found");
    }

    const updated = await HangHoaRepository.update(id, dto);
    return new HangHoaDTO(updated);
  },

  deleteHangHoa: async (id) => {
    logger.info(`Service: Deleting HangHoa ${id}`);

    const existing = await HangHoaRepository.getByMaloai(id);
    if (!existing) {
      logger.warn(`Service Warning: Cannot delete. HangHoa ${id} not found`);
      throw new Error("HangHoa not found");
    }

    await HangHoaRepository.delete(id);
    return { message: "HangHoa deleted successfully" };
  },

  //get hang hoa by TenHang
  getByTenloai: async (Tenloai) => {
    logger.info(`Service: Getting HangHoa by Name ${Tenloai}`);
    const HangHoa = await HangHoaRepository.getByTenloai(Tenloai);
    if (!HangHoa) {
      logger.warn(`Service Warning: HangHoa ${Tenloai} not found`);
      throw new Error("HangHoa not found");
    }
    //return new HanghoaDTO(HangHoa);
    return HangHoa.map(u => new HanghoaDTO(u));
  },

  //get hang hoa co so luong con < 5
  getBySLC: async () => {
    logger.info("Service: Getting HangHoa with low stock (<5)");
    const HangHoas = await HangHoaRepository.getBySLC();
    return HangHoas.map((u) => new HangHoaDTO(u));
  },

  // get thong tin hang hoa co gia ban con kha dung
  getByGiaBanKD: async () => {
    logger.info("Service: Getting HangHoa with reasonable price");
    const HangHoas = await HangHoaRepository.getByGiaBanKD();
    return HangHoas.map((u) => new HangHoaDTO(u));
  },

  //get thong tin hang hoa co gia ban con kha dung trong khoang gia
  getByKhoangGia: async (min, max) => {
    const data = await HangHoaRepository.getByKhoangGia(min, max);
    return data.map((u) => new HangHoaDTO(u));
  },
};
