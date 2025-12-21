import { CreateGiaoVienDTO } from "../dtos/giaovien/create-giaovien.dto.js";
import { UpdateGiaoVienDTO } from "../dtos/giaovien/update-giaovien.dto.js";
import { GiaoVienService } from "../services/giaovien.service.js";
import { validateCreateGiaoVien } from "../validators/giaovien/create-giaovien.validator.js";
import { validateUpdateGiaoVien } from "../validators/giaovien/update-giaovien.validator.js";
import { logger } from "../config/logger.js";

export const GiaoVienController = {
  getAll: async (req, res) => {
    try {
      const list = await GiaoVienService.getAll();
      res.json(list);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getByMagv: async (req, res) => {
    const { magv } = req.params;
    try {
      const gv = await GiaoVienService.getByMagv(magv);
      res.json(gv);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const valData = validateCreateGiaoVien(req.body);
      const dto = new CreateGiaoVienDTO(valData);
      const gv = await GiaoVienService.create(dto);
      res.status(201).json(gv);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const { magv } = req.params;
    try {
      const valData = validateUpdateGiaoVien(req.body);
      const dto = new UpdateGiaoVienDTO(valData);
      const gv = await GiaoVienService.update(magv, dto);
      res.json(gv);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const { magv } = req.params;
    try {
      const result = await GiaoVienService.delete(magv);
      res.json(result);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
};