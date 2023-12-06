import express from "express";
import { ProductsController } from "../controllers/products.controller.js";
import { validateProductData } from "../middlewares/validation/validateProductData.middleware.js";
import {
  verifyToken,
  authenticateUser,
} from "../middlewares/validation/validateToken.middleware.js";
import { checkProductOwner } from "./../middlewares/validation/checkProductOwner.middleware.js";
import { checkProductExistence } from "../middlewares/validation/checkProductExistence.middleware.js";

const router = express.Router();
const productsController = new ProductsController();

// 상품 전체 조회
router.get("/", productsController.getAllProducts);

// 상품 상세 조회
router.get(
  "/:productId",
  checkProductExistence,
  productsController.getProductDetail
);

// 상품 등록
router.post(
  "/",
  verifyToken,
  authenticateUser,
  validateProductData,
  productsController.createProduct
);

// 상품 수정
router.put(
  "/:productId",
  verifyToken,
  authenticateUser,
  checkProductOwner,
  checkProductExistence,
  validateProductData,
  productsController.updateProduct
);

// 상품 삭제
router.delete(
  "/:productId",
  verifyToken,
  authenticateUser,
  checkProductOwner,
  checkProductExistence,
  productsController.deleteProduct
);

export default router;
