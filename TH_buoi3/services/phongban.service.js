import { PhongBanRepository } from "../repositories/phongban.repository.js";
import { PhongBanDTO } from "../dtos/phongban/phongban.dto.js";
import { logger } from "../config/logger.js";

export const PhongBanService = {
    // Lấy tất cả phòng ban
    getAll: async () => {
        logger.info("Service: Fetching all PhongBan");
        try {
        const phongBans = await PhongBanRepository.getAll();
        return phongBans.map(pb => new PhongBanDTO(pb));
        } catch (err) {
        logger.error("Service Error: getAll failed", err);
        throw err;
        }
    },

};
