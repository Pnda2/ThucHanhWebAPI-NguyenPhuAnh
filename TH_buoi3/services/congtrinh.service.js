import { CongTrinhRepository } from "../repositories/congtrinh.repository.js";
import { CongTrinhDTO } from "../dtos/congtrinh/congtrinh.dto.js";
import { logger } from "../config/logger.js";

export const CongTrinhService = {
    // Lấy tất cả công trình
    getAll: async () => {
        logger.info("Service: Fetching all CongTrinh");
        try {
        const congTrinhs = await CongTrinhRepository.getAll();
        return congTrinhs.map(ct => new CongTrinhDTO(ct));
        } catch (err) {
        logger.error("Service Error: getAll failed", err);
        throw err;
        }
    },
};
