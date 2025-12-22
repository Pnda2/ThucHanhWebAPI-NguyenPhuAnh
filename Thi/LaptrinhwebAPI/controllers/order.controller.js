import { CreateOrderDTO } from "../dtos/order/create-order.dto.js";
import { UpdateOrderDTO } from "../dtos/order/update-order.dto.js";
import { orderService } from "../services/order.service.js";
import { validateGetOrderQuery } from "../validators/order/get-order.validator.js";

import { validateCreateOrder } from "../validators/order/create-order.validator.js";
import { validateUpdateOrder } from "../validators/order/update-order.validator.js";

import { logger } from "../config/logger.js";

export const orderController = {
  //tạo đơn hàng cho user đang đăng nhập (tạo orders + order_items)
  create: async (req, res) => {
    try {
      logger.info("Controller: POST /orders");

      const userId = req.user.id;
      const validData = validateCreateOrder(req.body);
      const result = await orderService.createOrder(userId, validData.items);

      res.status(201).json(result);
    } catch (err) {
      logger.error("Controller Error: Create Order failed", err);
      if (
        err.message.includes("not found") ||
        err.message.includes("out of stock")
      ) {
        return res.status(400).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    }
  },
  getHistory: async (req, res) => {
    try {
      const userId = req.user.id; // Lấy ID từ token
      logger.info(`Controller: GET /orders/history for user ${userId}`);
      const queryParams = validateGetOrderQuery(req.query);
      const result = await orderService.getMyOrders(userId, queryParams);

      res.json(result);
    } catch (err) {
      logger.error("Controller Error: getHistory failed", err);
      // Nếu lỗi validate của Zod
      if (err.errors) {
        return res
          .status(400)
          .json({ message: "Invalid query params", errors: err.errors });
      }
      res.status(500).json({ message: err.message });
    }
  },
};
