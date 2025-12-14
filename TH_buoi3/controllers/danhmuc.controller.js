import { CreateDanhMucDTO } from "../dtos/danhmuc/create-danhmuc.dto.js";
import { UpdateDanhMucDTO } from "../dtos/danhmuc/update-danhmuc.dto.js";
import { DanhMucService } from "../services/danhmuc.service.js";

import { validateCreateDanhMuc } from "../validators/danhmuc/create-danhmuc.validator.js";
import { validateUpdateDanhMuc } from "../validators/danhmuc/update-danhmuc.validator.js";

import { logger } from "../config/logger.js";

export const DanhMucController = {
  // Lấy tất cả danh mục
    getAllDanhMuc: async (req, res) => {
        logger.info("Controller: getAllDanhMuc called");
        try {
        const danhmucs = await DanhMucService.getAllDanhMuc();
        res.status(200).json(danhmucs);
        } catch (err) {
        logger.error("Controller Error: getAllDanhMuc failed", err);
        res.status(500).json({ error: "Internal Server Error" });
        }
    },
};