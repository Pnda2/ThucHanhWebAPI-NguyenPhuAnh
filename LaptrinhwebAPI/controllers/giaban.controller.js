import { CreateGiaBanDTO } from "../dtos/giaban/create-giaban.dto.js";
import { UpdateGiaBanDTO } from "../dtos/giaban/update-giaban.dto.js";
import { GiaBanService } from "../services/giaban.service.js";

import { validateCreateGiaBan } from "../validators/giaban/create-giaban.validator.js";
import { validateUpdateGiaBan } from "../validators/giaban/update-giaban.validator.js";

import { logger } from "../config/logger.js";

export const GiaBanController = {
  // Get all GiaBans
    getAll: async (req, res) => {
        try {
        logger.info("Controller: GET /GiaBans");
        const GiaBans = await GiaBanService.getAllGiaBans();
        res.json(GiaBans);
        } catch (err) {
        logger.error("Controller Error: getAll failed", err);
        res.status(500).json({ message: err.message });
        }
    },
    // Get GiaBan by MaHang
    getByMaHang: async (req, res) => {
        const MaHang = +req.params.MaHang;
        logger.info(`Controller: GET /GiaBans/${MaHang}`);
    
        try {
        const GiaBan = await GiaBanService.getGiaBanByMaHang(MaHang);
        res.json(GiaBan);
        } catch (err) {
        logger.error(`Controller Error: getByMaHang failed (${MaHang})`, err);
        res.status(404).json({ message: err.message });
        }
    },
    // Create new GiaBan
    create: async (req, res) => {
        try {
        logger.info("Controller: POST /GiaBans");
    
        // VALIDATE INPUT
        const validData = validateCreateGiaBan(req.body);
    
        // CREATE DTO
        const dto = new CreateGiaBanDTO(validData);
    
        const GiaBan = await GiaBanService.createGiaBan(dto);
        res.status(201).json(GiaBan);
        } catch (err) {
        logger.error("Controller Error: create failed", err);
        res.status(400).json({ message: err.message });
        }
    },
    // Update existing GiaBan
    update: async (req, res) => {
        const magb = +req.params.magb;
        logger.info(`Controller: PUT /GiaBans/up/${magb}`);
    
        try {
        // VALIDATE INPUT
        const validData = validateUpdateGiaBan(req.body);
    
        // CREATE DTO
        const dto = new UpdateGiaBanDTO(validData);
    
        const GiaBan = await GiaBanService.updateGiaBan(magb, dto);
        res.json(GiaBan);
        } catch (err) {
        logger.error(`Controller Error: update failed (${magb})`, err);
        res.status(400).json({ message: err.message });
        }
    },
    // Delete GiaBan
    delete: async (req, res) => {
        const magb = +req.params.magb;
        logger.info(`Controller: DELETE /GiaBans/dl/${magb}`);
    
        try {
        await GiaBanService.deleteGiaBan(magb);
        res.json({ message: "GiaBan deleted successfully" });
        } catch (err) {
        logger.error(`Controller Error: delete failed (${magb})`, err);
        res.status(400).json({ message: err.message });
        }
    },
};