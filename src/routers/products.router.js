import express from "express";
import { ProductsController } from "../controllers/products.controller.js";
import { validateProductData } from "./../middlewares/validate/validateProductData.middleware.js";
import {
  verifyToken,
  authenticateUser,
} from "../middlewares/validate/validateToken.middleware.js";

const router = express.Router();
const productsController = new ProductsController();

// 상품 전체 조회
router.get("/", productsController.getAllProducts);

// 상품 등록
router.post(
  "/",
  verifyToken,
  authenticateUser,
  validateProductData,
  productsController.createProduct
);

export default router;
