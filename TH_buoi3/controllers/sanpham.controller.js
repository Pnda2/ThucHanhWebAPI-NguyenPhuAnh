import { CreateSanPhamDTO } from "../dtos/sanpham/create-sanpham.dto.js";
import { UpdateSanPhamDTO } from "../dtos/sanpham/update-sanpham.dto.js";
import { SanPhamService } from "../services/sanpham.service.js";

import { validateCreateSanPham } from "../validators/sanpham/create-sanpham.validator.js";
import { validateUpdateSanPham } from "../validators/sanpham/update-sanpham.validator.js";

import { logger } from "../config/logger.js";

export const SanPhamController = {
  // Lấy tất cả sản phẩm
  getAllSanPham: async (req, res) => {
    logger.info("Controller: getAllSanPham called");
    try {
      const sanphams = await SanPhamService.getAllSanPham();
      res.status(200).json(sanphams);
    } catch (err) {
      logger.error("Controller Error: getAllSanPham failed", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  // lấy sản phẩm theo mã   
    getSanPhamByMa: async (req, res) => {
        const Ma = req.params.Ma;
        logger.info(`Controller: getSanPhamByMa called with Ma ${Ma}`);
        try {
        const sanpham = await SanPhamService.getSanPhamByMa(Ma);
        res.status(200).json(sanpham);
        } catch (err) {
        logger.error(`Controller Error: getSanPhamByMa failed for Ma ${Ma}`, err);
        res.status(404).json({ error: "SanPham not found" });
        }
    },
    //Lấy sản phẩm theo mã danh mục
    getSanPhamByMaDanhMuc: async (req, res) => {
        const MaDanhMuc = req.params.MaDanhMuc;
        logger.info(`Controller: getSanPhamByMaDanhMuc called with MaDanhMuc ${MaDanhMuc}`);
        try {
        const sanphams = await SanPhamService.getSanPhamByMaDanhMuc(MaDanhMuc);
        res.status(200).json(sanphams);
        } catch (err) {
        logger.error(`Controller Error: getSanPhamByMaDanhMuc failed for MaDanhMuc ${MaDanhMuc}`, err);
        res.status(500).json({ error: "Internal Server Error" });
        }
    },
    // Tạo mới sản phẩm
    createSanPham: async (req, res) => {
        logger.info("Controller: createSanPham called");
        try {
        const validData = validateCreateSanPham(req.body);
        const dto = new CreateSanPhamDTO(validData);
        const sanpham = await SanPhamService.createSanPham(dto);
        res.status(201).json(sanpham);
        } catch (err) {
        logger.error("Controller Error: createSanPham failed", err);
        res.status(400).json({ error: err.message });
        }
    },
    // Cập nhật sản phẩm
    updateSanPham: async (req, res) => {
        const Ma = req.params.Ma;
        logger.info(`Controller: updateSanPham called with Ma ${Ma}`);
        try {
        const validData = validateUpdateSanPham(req.body);
        const dto = new UpdateSanPhamDTO(validData);
        const sanpham = await SanPhamService.updateSanPham(Ma, dto);
        res.status(200).json(sanpham);
        } catch (err) {
        logger.error(`Controller Error: updateSanPham failed for Ma ${Ma}`, err);
        res.status(400).json({ error: err.message });
        }
    },
    // Xóa sản phẩm
    deleteSanPham: async (req, res) => {
        const Ma = req.params.Ma;
        logger.info(`Controller: deleteSanPham called with Ma ${Ma}`);
        try {
        const result = await SanPhamService.deleteSanPham(Ma);
        res.status(200).json(result);
        } catch (err) {
        logger.error(`Controller Error: deleteSanPham failed for Ma ${Ma}`, err);
        res.status(400).json({ error: err.message });
        }
    },
    // Lấy sản phẩm có tên chứa chuỗi truyền vào
    searchByTen: async (req, res) => {
        const Ten = req.query.Ten || "";
        logger.info(`Controller: searchByTen called with Ten ${Ten}`);
        try {
        const sanphams = await SanPhamService.searchByTen(Ten);
        res.status(200).json(sanphams);
        } catch (err) {
        logger.error(`Controller Error: searchByTen failed for Ten ${Ten}`, err);
        res.status(500).json({ error: "Internal Server Error" });
        }
    },
    // Phân trang và sắp xếp sản phẩm
    getAllWithPagination: async (req, res) => { // SỬA: Phải nhận req, res
        try {
          // 1. Lấy tham số từ Query String (URL)
          // Query trả về string, cần ép kiểu sang số (Int)
          const page = parseInt(req.query.page) || 1;
          const size = parseInt(req.query.size) || 10;
          
          // Xử lý sort (mặc định là donGia,asc nếu không truyền)
          // Lấy phần 'asc' hoặc 'desc' từ chuỗi "donGia,asc"
          const sortParam = req.query.sort || 'donGia,asc';
          const sortType = sortParam.split(',')[1] || 'asc'; 
    
          logger.info(`Controller: getAllWithPagination called with page ${page}, size ${size}, sortType ${sortType}`);
    
          // 2. Gọi Service
          const sanphams = await SanPhamService.getAllWithPagination(page, size, sortType);
          
          res.status(200).json(sanphams);
        } catch (err) {
          logger.error("Controller Error: getAllWithPagination failed", err);
          res.status(500).json({ error: "Internal Server Error" });
        }
      },
    
      // Thống kê số sản phẩm theo danh mục
      getThongKeDanhMuc: async (req, res) => { // SỬA: Phải nhận req, res
        logger.info("Controller: getThongKeDanhMuc called");
        try {
          const stats = await SanPhamService.getThongKeDanhMuc();
          res.status(200).json(stats);
        } catch (err) {
          logger.error("Controller Error: getThongKeDanhMuc failed", err);
          res.status(500).json({ error: "Internal Server Error" });
        }
      },
};