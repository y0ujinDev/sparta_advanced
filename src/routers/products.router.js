import express from "express";
import { prisma } from "../utils/prisma/index.js";
import { ProductsController } from "../controllers/products.controller.js";
import { ProductsService } from "../services/products.service.js";
import { ProductsRepository } from "../repositories/products.repository.js";
import { validateProductData } from "../middlewares/validation/validateProductData.middleware.js";
import {
  verifyToken,
  authenticateUser
} from "../middlewares/validation/validateToken.middleware.js";
import { checkProductOwner } from "./../middlewares/validation/checkProductOwner.middleware.js";
import { checkProductExistence } from "../middlewares/validation/checkProductExistence.middleware.js";

const router = express.Router();
const productsRepository = new ProductsRepository(prisma);
const productsService = new ProductsService(productsRepository);
const productsController = new ProductsController(productsService);

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
  checkProductExistence,
  checkProductOwner,
  validateProductData,
  productsController.updateProduct
);

// 상품 삭제
router.delete(
  "/:productId",
  verifyToken,
  authenticateUser,
  checkProductExistence,
  checkProductOwner,
  productsController.deleteProduct
);

export default router;
