import { orderRepository } from "../repositories/order.repository.js";
import { OrderDTO } from "../dtos/order/order.dto.js";
import { productRepository } from "../repositories/product.repository.js";
import { logger } from "../config/logger.js";

export const orderService = {
  //tạo đơn hàng cho user đang đăng nhập (tạo orders + order_items)
  createOrder: async (userId, itemsDTO) => {
    logger.info(`Service: User ${userId} is creating an order`);

    const itemsWithPrice = [];

    for (const item of itemsDTO) {
      const product = await productRepository.getById(item.product_id);

      if (!product) {
        throw new Error(`Product ID ${item.product_id} not found`);
      }
      
      if (product.stock < item.qty) {
        throw new Error(`Product ${product.name} is out of stock`);
      }
      itemsWithPrice.push({
        product_id: item.product_id,
        qty: item.qty,
        unit_price: product.price 
      });
    }
    const newOrderId = await orderRepository.createOrderWithItems(userId, itemsWithPrice);

    return { 
      message: "Order created successfully", 
      order_id: newOrderId 
    };
  },
  getMyOrders: async (userId, query) => {
    const { page, limit, status } = query;
    
    // 1. Tính vị trí bắt đầu (OFFSET)
    const offset = (page - 1) * limit;

    // 2. Chạy song song 2 câu lệnh: Lấy data và Đếm tổng
    const [orders, totalCount] = await Promise.all([
      orderRepository.getByUserId({ userId, status, limit, offset }),
      orderRepository.countByUserId({ userId, status })
    ]);

    // 3. Tính tổng số trang
    const totalPages = Math.ceil(totalCount / limit);

    // 4. Trả về cấu trúc chuẩn pagination
    return {
      data: orders,
      pagination: {
        page,
        limit,
        total_items: totalCount,
        total_pages: totalPages
      }
    };
  }
};
