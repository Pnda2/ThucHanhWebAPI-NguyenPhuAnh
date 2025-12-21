import { CreateLopHocDTO } from "../dtos/lophoc/create-lophoc.dto.js";
import { UpdateLopHocDTO } from "../dtos/lophoc/update-lophoc.dto.js";
import { LopHocService } from "../services/lophoc.service.js";
import { validateCreateLopHoc } from "../validators/lophoc/create-lophoc.validator.js";
import { validateUpdateLopHoc } from "../validators/lophoc/update-lophoc.validator.js";
import { logger } from "../config/logger.js";

export const LopHocController = {
  getAll: async (req, res) => {
    try {
      const list = await LopHocService.getAll();
      res.json(list);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getByKyhieu: async (req, res) => {
    const { kyhieu } = req.params;
    try {
      const lh = await LopHocService.getByKyhieu(kyhieu);
      res.json(lh);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const valData = validateCreateLopHoc(req.body);
      const dto = new CreateLopHocDTO(valData);
      const lh = await LopHocService.create(dto);
      res.status(201).json(lh);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const { kyhieu } = req.params;
    try {
      const valData = validateUpdateLopHoc(req.body);
      const dto = new UpdateLopHocDTO(valData);
      const lh = await LopHocService.update(kyhieu, dto);
      res.json(lh);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const { kyhieu } = req.params;
    try {
      const result = await LopHocService.delete(kyhieu);
      res.json(result);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
};