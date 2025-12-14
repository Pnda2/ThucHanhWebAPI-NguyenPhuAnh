import { CreateCongDTO } from "../dtos/cong/create-cong.dto.js";
import { UpdateCongDTO } from "../dtos/cong/update-cong.dto.js";
import { CongService } from "../services/cong.service.js";

import { validateCreateCong } from "../validators/cong/create-cong.validator.js";
import { validateUpdateCong } from "../validators/cong/update-cong.validator.js";

import { logger } from "../config/logger.js";

export const CongController = {
  // API: POST /api/cong
  phanCong: async (req, res) => {
    try {
      // 1. Validate dữ liệu đầu vào
      const validation = safeValidateCreateCong(req.body);
      
      if (!validation.success) {
        // Trả về lỗi 400 Bad Request nếu dữ liệu sai format
        return res.status(400).json({
          message: "Dữ liệu đầu vào không hợp lệ",
          errors: validation.errors
        });
      }

      // 2. Gọi Service xử lý
      await CongService.createPhanCong(validation.data);

      // 3. Trả về thành công
      return res.status(201).json({
        message: "Phân công nhân viên thành công!",
        data: validation.data
      });

    } catch (error) {
      // Xử lý các lỗi logic (như trùng lặp khóa chính)
      if (error.message.includes("đã được phân công")) {
        return res.status(409).json({ message: error.message }); // 409 Conflict
      }
      
      console.error(error);
      return res.status(500).json({ message: "Lỗi hệ thống khi phân công" });
    }
  },

  // API: GET /api/thongke/nhanvien/:manv/ngaycong
  thongKe: async (req, res) => {
    try {
      const { manv } = req.params;

      // 1. Gọi Service lấy dữ liệu
      const result = await CongService.getThongKeNhanVien(manv);

      // 2. Kiểm tra nếu không có dữ liệu
      if (!result) {
        return res.status(404).json({
          message: `Không tìm thấy dữ liệu công cho nhân viên mã: ${manv}`,
          chi_tiet: []
        });
      }

      // 3. Trả về kết quả
      return res.status(200).json(result);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Lỗi hệ thống khi thống kê" });
    }
  }
};