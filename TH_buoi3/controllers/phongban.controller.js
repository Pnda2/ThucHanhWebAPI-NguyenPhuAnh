import { CreatePhongBanDTO } from "../dtos/phongban/create-phongban.dto.js";
import { UpdatePhongBanDTO } from "../dtos/phongban/update-phongban.dto.js";
import {PhongBanService } from "../services/phongban.service.js";

import { validateCreatePhongBan } from "../validators/phongban/create-phongban.validator.js";
import { validateUpdatePhongBan } from "../validators/phongban/update-phongban.validator.js";

import { logger } from "../config/logger.js";

export const PhongBanController = {
  // Lấy tất cả phòng ban
    getAllPhongBan: async (req, res) => {
        logger.info("Controller: getAllPhongBan called");
        try {
        const phongbans = await PhongBanService.getAllPhongBan();
        res.status(200).json(phongbans);
        } catch (err) {
        logger.error("Controller Error: getAllPhongBan failed", err);
        res.status(500).json({ error: "Internal Server Error" });
        }
    },
};