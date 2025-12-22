import { productRepository } from "../repositories/product.repository.js";
import { ProductDTO } from "../dtos/products/product.dto.js";
import { logger } from "../config/logger.js";

export const productService = {
  //xem danh sách sản phẩm đang bán (lọc theo keyword, sort theo giá)
  getAllProducts: async (queryParams) => {
    logger.info("Service: Getting filtered products");
    const { keyword, sort } = queryParams || {};
    const cleanKeyword = keyword ? keyword.trim() : null;
    let safeSort = 'ASC';
    if (sort && sort.toUpperCase() === 'DESC') {
      safeSort = 'DESC';
    }
    const products = await productRepository.getAll(cleanKeyword, safeSort);
    return products.map((p) => new ProductDTO(p));
  },
};
