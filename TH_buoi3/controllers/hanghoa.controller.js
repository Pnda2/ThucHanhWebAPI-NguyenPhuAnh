import { CreateHangHoaDTO } from "../dtos/hanghoa/create-hanghoa.dto.js";
import { UpdateHangHoaDTO } from "../dtos/hanghoa/update-hanghoa.dto.js";
import { HangHoaService } from "../services/hanghoa.service.js";

import { validateCreateHangHoa } from "../validators/hanghoa/create-hanghoa.validator.js";
import { validateUpdateHangHoa } from "../validators/hanghoa/update-hanghoa.validator.js";

import { logger } from "../config/logger.js";

export const HangHoaController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /HangHoas");
      const HangHoas = await HangHoaService.getAllHangHoas();
      res.json(HangHoas);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  getByMaloai: async (req, res) => {
    const id = +req.params.id;
    logger.info(`Controller: GET /HangHoas/${id}`);

    try {
      const HangHoa = await HangHoaService.getHangHoaByMaloai(id);
      res.json(HangHoa);
    } catch (err) {
      logger.error(`Controller Error: getById failed (${id})`, err);
      res.status(404).json({ message: err.message });
    }
  },

  create: async (req, res) => {
    try {
      logger.info("Controller: POST /HangHoas");

      // VALIDATE INPUT
      const validData = validateCreateHangHoa(req.body);

      // CREATE DTO
      const dto = new CreateHangHoaDTO(validData);

      const HangHoa = await HangHoaService.createHangHoa(dto);
      res.status(201).json(HangHoa);
    } catch (err) {
      logger.error("Controller Error: create failed", err);
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const id = +req.params.id;
    logger.info(`Controller: PUT /HangHoas/${id}`);

    try {
      // VALIDATE INPUT
      const validData = validateUpdateHangHoa(req.body);

      // CREATE DTO
      const dto = new UpdateHangHoaDTO(validData);

      const HangHoa = await HangHoaService.updateHangHoa(id, dto);
      res.json(HangHoa);
    } catch (err) {
      logger.error(`Controller Error: update failed (${id})`, err);
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const id = +req.params.id;
    logger.info(`Controller: DELETE /HangHoas/${id}`);

    try {
      const result = await HangHoaService.deleteHangHoa(id);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: delete failed (${id})`, err);
      res.status(404).json({ message: err.message });
    }
  },

  //get hang hoa by TenHang
  getByTenloai: async (req, res) => {
    const Tenloai = req.params.Tenloai;
    logger.info(`Controller: GET /HangHoas/tenloai/${Tenloai}`);

    try {
      const HangHoa = await HangHoaService.getByTenloai(Tenloai);
      res.json(HangHoa);
    } catch (err) {
      logger.error(`Controller Error: getByTenloai failed (${Tenloai})`, err);
      res.status(404).json({ message: err.message });
    }
  },

  //get hang hoa co so luong con < 5
  getBySLC: async (req, res) => {
    logger.info(`Controller: GET /HangHoas/soluongcon`);

    try {
      const HangHoa = await HangHoaService.getBySLC();
      res.json(HangHoa);
    } catch (err) {
      logger.error(`Controller Error: getBySLC failed`, err);
      res.status(404).json({ message: err.message });
    }
  },

  //get thong tin hang hoa co gia ban con kha dung
  getByGiaBanKD: async (req, res) => {
    logger.info(`Controller: GET /HangHoas/giabankd`);

    try {
      const HangHoa = await HangHoaService.getByGiaBanKD();
      res.json(HangHoa);
    } catch (err) {
      logger.error(`Controller Error: getByGiaBanKD failed`, err);
      res.status(404).json({ message: err.message });
    }
  },

  //get thong tin hang hoa co gia ban con kha dung trong khoang gia
  getByKhoangGia: async (req, res) => {
    const min = +req.query.min;
    const max = +req.query.max;
    logger.info(`Controller: GET /HangHoas/khoanggia?min=${min}&max=${max}`);

    if (!min || !max) {
      return res.status(400).json({ 
          message: "Vui lòng cung cấp đủ tham số min và max (VD: ?min=1000&max=50000)" 
      });
  }
  
    try {
      const HangHoa = await HangHoaService.getByKhoangGia(min, max);
      res.json(HangHoa);
    } catch (err) {
      logger.error(`Controller Error: getByKhoangGia failed (min:${min}, max:${max})`, err);
      res.status(404).json({ message: err.message });
    }
  },
};