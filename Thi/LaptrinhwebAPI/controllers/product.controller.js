import { CreateProductDTO } from "../dtos/products/create-product.dto.js";
import { UpdateProductDTO } from "../dtos/products/update-product.dto.js";
import { productService } from "../services/product.service.js";

import { validateCreateProduct } from "../validators/products/create-product.validator.js";
import { validateUpdateProduct } from "../validators/products/update-product.validator.js";

import { logger } from "../config/logger.js";

export const productController = {
  //xem danh sách sản phẩm đang bán (lọc theo keyword, sort theo giá)
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /products");

      const products = await productService.getAllProducts(req.query);
      res.status(200).json(products);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },
};
