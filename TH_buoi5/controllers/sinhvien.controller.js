import { CreateSinhVienDTO } from "../dtos/sinhvien/create-sinhvien.dto.js";
import { UpdateSinhVienDTO } from "../dtos/sinhvien/update-sinhvien.dto.js";
import { SinhVienService } from "../services/sinhvien.service.js";
import { validateCreateSinhVien } from "../validators/sinhvien/create-sinhvien.validator.js";
import { validateUpdateSinhVien } from "../validators/sinhvien/update-sinhvien.validator.js";
import { logger } from "../config/logger.js";

export const SinhVienController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /SinhViens");
      const list = await SinhVienService.getAll();
      res.json(list);
      
    } catch (err) {
      logger.error("Controller Error: getAll SinhVien failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  getByMasv: async (req, res) => {
    const { masv } = req.params;
    try {
      const sv = await SinhVienService.getByMasv(masv);
      res.json(sv);
    } catch (err) {
      logger.error(`Controller Error: getByMasv failed (${masv})`, err);
      res.status(404).json({ message: err.message });
    }
  },

  create: async (req, res) => {
    try {
      logger.info("Controller: POST /SinhViens");
      const valData = validateCreateSinhVien(req.body);
      const dto = new CreateSinhVienDTO(valData);
      const sv = await SinhVienService.create(dto);
      res.status(201).json(sv);
    } catch (err) {
      logger.error("Controller Error: create SinhVien failed", err);
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const { masv } = req.params;
    try {
      const valData = validateUpdateSinhVien(req.body);
      const dto = new UpdateSinhVienDTO(valData);
      const sv = await SinhVienService.update(masv, dto);
      res.json(sv);
    } catch (err) {
      logger.error(`Controller Error: update SinhVien failed (${masv})`, err);
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const { masv } = req.params;
    try {
      const result = await SinhVienService.delete(masv);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: delete SinhVien failed (${masv})`, err);
      res.status(404).json({ message: err.message });
    }
  },
};