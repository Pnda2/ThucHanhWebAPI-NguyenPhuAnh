import { CreateCongTrinhDTO } from "../dtos/congtrinh/create-congtrinh.dto.js";
import { UpdateCongTrinhDTO } from "../dtos/congtrinh/update-congtrinh.dto.js";
import { CongTrinhService } from "../services/congtrinh.service.js";

import { validateCreateCongTrinh } from "../validators/congtrinh/create-congtrinh.validator.js";
import { validateUpdateCongTrinh } from "../validators/congtrinh/update-congtrinh.validator.js";

import { logger } from "../config/logger.js";

export const CongTrinhController = {
  // Lấy tất cả công trình
    getAllCongTrinh: async (req, res) => {
        logger.info("Controller: getAllCongTrinh called");
        try {
        const congtrinhs = await CongTrinhService.getAllCongTrinh();
        res.status(200).json(congtrinhs);
        } catch (err) {
        logger.error("Controller Error: getAllCongTrinh failed", err);
        res.status(500).json({ error: "Internal Server Error" });
        }
    },
};