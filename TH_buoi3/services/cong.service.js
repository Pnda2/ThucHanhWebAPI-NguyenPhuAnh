import { CongRepository } from "../repositories/cong.repository.js";
import { CongDTO } from "../dtos/cong/cong.dto.js";
import { logger } from "../config/logger.js";

export const CongService = {
    createPhanCong: async (data) => {
        // Gọi repository để lưu xuống DB
        // data đã được validate ở Controller trước khi truyền vào đây
        const isCreated = await CongRepository.createPhanCong(data);
        return isCreated;
      },
    
      // 2. Xử lý logic thống kê và format dữ liệu
      getThongKeNhanVien: async (manv) => {
        // Lấy dữ liệu thô từ DB (Dạng mảng phẳng)
        const rawData = await CongRepository.getSoNgayCongByNhanVien(manv);
    
        // Nếu không tìm thấy dữ liệu
        if (!rawData || rawData.length === 0) {
          return null;
        }
    
        // Xử lý dữ liệu thô thành cấu trúc JSON đẹp
        // Lấy thông tin nhân viên từ dòng đầu tiên
        const infoNhanVien = {
          MANV: rawData[0].MANV,
          HOTEN: rawData[0].HOTEN
        };
    
        // Tính tổng ngày công (Cộng dồn cột SLNGAYCONG)
        const tongNgayCong = rawData.reduce((sum, item) => sum + item.SLNGAYCONG, 0);
    
        // Tạo danh sách chi tiết các công trình
        const chiTietCongTrinh = rawData.map(item => ({
          MACT: item.MACT,
          TENCT: item.TENCT,
          SLNGAYCONG: item.SLNGAYCONG
        }));
    
        // Trả về object hoàn chỉnh
        return {
          nhan_vien: infoNhanVien,
          tong_ngay_cong: tongNgayCong,
          chi_tiet: chiTietCongTrinh
        };
      }

};
