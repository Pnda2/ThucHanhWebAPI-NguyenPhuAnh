import { DanhMucRepository } from "../repositories/danhmuc.repository.js";
import { DanhMucDTO } from "../dtos/danhmuc/danhmuc.dto.js";
import { logger } from "../config/logger.js";

export const DanhMucService = {
  // Lấy tất cả danh mục
    getAllDanhMuc: async () => {
        logger.info("Service: Getting all DanhMuc");
        const danhmucs = await DanhMucRepository.getAll();
        return danhmucs.map((dm) => new DanhMucDTO(dm));
    },

};
