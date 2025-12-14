import { SanPhamRepository } from "../repositories/sanpham.repository.js";
import { SanPhamDTO } from "../dtos/sanpham/sanpham.dto.js";
import { logger } from "../config/logger.js";

export const SanPhamService = {
  // Lấy tất cả sản phẩm
    getAllSanPham: async () => {
        logger.info("Service: Getting all SanPham");
        const sanphams = await SanPhamRepository.getAll();
        return sanphams.map((sp) => new SanPhamDTO(sp));
    },
    // lấy sản phẩm theo mã
    getSanPhamByMa: async (Ma) => {
        logger.info(`Service: Getting SanPham by Ma ${Ma}`);
        const sanpham = await SanPhamRepository.getByMa(Ma);

        if (!sanpham) {
            logger.warn(`Service Warning: SanPham ${Ma} not found`);
            throw new Error("SanPham not found");
        }

        return new SanPhamDTO(sanpham);
    },
    //Lấy sản phẩm theo mã danh mục
    getSanPhamByMaDanhMuc: async (MaDanhMuc) => {
        logger.info(`Service: Getting SanPham by MaDanhMuc ${MaDanhMuc}`);
        const sanphams = await SanPhamRepository.getByMaDanhMuc(MaDanhMuc);
        return sanphams.map((sp) => new SanPhamDTO(sp));
    },
    // Tạo mới sản phẩm
    createSanPham: async (dto) => {
        logger.info(`Service: Creating new SanPham ${dto.Ten}`);
        const created = await SanPhamRepository.create(dto);
        return new SanPhamDTO(created);
    },
    // Cập nhật sản phẩm
    updateSanPham: async (Ma, dto) => {
        logger.info(`Service: Updating SanPham ${Ma}`);

        const existing = await SanPhamRepository.getByMa(Ma);
        if (!existing) {
            logger.warn(`Service Warning: Cannot update. SanPham ${Ma} not found`);
            throw new Error("SanPham not found");
        }

        const updated = await SanPhamRepository.update(Ma, dto);
        return new SanPhamDTO(updated);
    },
    // Xóa sản phẩm
    deleteSanPham: async (Ma) => {
        logger.info(`Service: Deleting SanPham ${Ma}`);

        const existing = await SanPhamRepository.getByMa(Ma);
        if (!existing) {
            logger.warn(`Service Warning: Cannot delete. SanPham ${Ma} not found`);
            throw new Error("SanPham not found");
        }

        await SanPhamRepository.delete(Ma);
        return { message: "SanPham deleted successfully" };
    },
    //Lấy sản phẩm có tên chứa chuỗi truyền vào
    searchByTen: async (Ten) => {
        logger.info(`Service: Searching SanPham with Ten containing "${Ten}"`);
        const sanphams = await SanPhamRepository.searchByTen(Ten);
        return sanphams.map((sp) => new SanPhamDTO(sp));
    },
    //Phân trang và sắp xếp sản phẩm
    getAllWithPagination: async (page, size, sortType) => {
        logger.info(`Service: Getting paginated SanPham - Page: ${page}, Size: ${size}, SortType: ${sortType}`);
        
        // 1. Gọi Repo lấy kết quả gộp (gồm data và pagination)
        const result = await SanPhamRepository.getAllWithPagination(page, size, sortType);
        
        // 2. Chỉ map DTO cho phần data (danh sách sản phẩm)
        const productDTOs = result.data.map((sp) => new SanPhamDTO(sp));
    
        // 3. Trả về cấu trúc y nguyên nhưng data đã được chuẩn hóa qua DTO
        return {
          data: productDTOs,
          pagination: result.pagination
        };
      },
    //Thống kê số sản phẩm theo danh mục
    getThongKeDanhMuc: async () => {
        logger.info("Service: Counting SanPham by DanhMuc");
        const counts = await SanPhamRepository.getThongKeDanhMuc();
        return counts;
    },
};
