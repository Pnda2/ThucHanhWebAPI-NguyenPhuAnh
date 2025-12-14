import { CreateNhanVienDTO } from "../dtos/nhanvien/create-nhanvien.dto.js";
import { UpdateNhanVienDTO } from "../dtos/nhanvien/update-nhanvien.dto.js";
import { NhanVienService } from "../services/nhanvien.service.js";

import { validateCreateNhanVien } from "../validators/nhanvien/create-nhanvien.validator.js";
import { validateUpdateNhanVien } from "../validators/nhanvien/update-nhanvien.validator.js";

import { logger } from "../config/logger.js";

export const NhanVienController = {
  // Lấy tất cả nhân viên
    getAllNhanVien: async (req, res) => {
        logger.info("Controller: getAllNhanVien called");
        try {
        const nhanviens = await NhanVienService.getAllNhanVien();
        res.status(200).json(nhanviens);
        } catch (err) {
        logger.error("Controller Error: getAllNhanVien failed", err);
        res.status(500).json({ error: "Internal Server Error" });
        }
    },
    // Lấy nhân viên theo MaNV
    getNhanVienByMa: async (req, res) => {
        const { MaNV } = req.params;
        logger.info(`Controller: getNhanVienByMa called with MaNV=${MaNV}`);
        try {
        const nhanvien = await NhanVienService.getNhanVienByMa(MaNV);
        res.status(200).json(nhanvien);
        } catch (err) {
        logger.error(`Controller Error: getNhanVienByMa failed for MaNV=${MaNV}`, err);
        res.status(500).json({ error: "Internal Server Error" });
        }
    },
    // Thêm nhân viên mới
    createNhanVien: async (req, res) => {
        logger.info("Controller: createNhanVien called");
        try {
        const createNhanVienDTO = new CreateNhanVienDTO(req.body);
        const validationErrors = validateCreateNhanVien(createNhanVienDTO);
        if (validationErrors.length > 0) {
            logger.warn("Controller Warning: Validation failed for createNhanVien", validationErrors);
            return res.status(400).json({ errors: validationErrors });
        }
        const newNhanVien = await NhanVienService.createNhanVien(createNhanVienDTO);
        res.status(201).json(newNhanVien);
        } catch (err) {
        logger.error("Controller Error: createNhanVien failed", err);
        res.status(500).json({ error: "Internal Server Error" });
        }
    },
    // Cập nhật thông tin nhân viên
    updateNhanVien: async (req, res) => {
        const { MaNV } = req.params;
        logger.info(`Controller: updateNhanVien called with MaNV=${MaNV}`);
        try {
        const updateNhanVienDTO = new UpdateNhanVienDTO(req.body);
        const validationErrors = validateUpdateNhanVien(updateNhanVienDTO);
        if (validationErrors.length > 0) {
            logger.warn("Controller Warning: Validation failed for updateNhanVien", validationErrors);
            return res.status(400).json({ errors: validationErrors });
        }
        const updatedNhanVien = await NhanVienService.updateNhanVien(MaNV, updateNhanVienDTO);
        res.status(200).json(updatedNhanVien);
        } catch (err) {
        logger.error(`Controller Error: updateNhanVien failed for MaNV=${MaNV}`, err);
        res.status(500).json({ error: "Internal Server Error" });
        }
    },
    // Xoá nhân viên
    deleteNhanVien: async (req, res) => {
        const { MaNV } = req.params;
        logger.info(`Controller: deleteNhanVien called with MaNV=${MaNV}`);
        try {
        await NhanVienService.deleteNhanVien(MaNV);
        res.status(200).json({ message: `NhanVien with MaNV=${MaNV} deleted successfully` });
        } catch (err) {
        logger.error(`Controller Error: deleteNhanVien failed for MaNV=${MaNV}`, err);
        res.status(500).json({ error: "Internal Server Error" });
        }
    },
    // Lấy nhân viên theo phòng ban
    getNhanVienByPhongBan: async (req, res) => {
        const { MaPB } = req.params;
        logger.info(`Controller: getNhanVienByPhongBan called with MaPB=${MaPB}`);
        try {
        const nhanviens = await NhanVienService.getNhanVienByPhongBan(MaPB);
        res.status(200).json(nhanviens);
        } catch (err) {
        logger.error(`Controller Error: getNhanVienByPhongBan failed for MaPB=${MaPB}`, err);
        res.status(500).json({ error: "Internal Server Error" });
        }
    },
};