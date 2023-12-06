import express from "express";
import { ProductsController } from "../controllers/products.controller.js";

const router = express.Router();
const productsController = new ProductsController();

router.get("/", productsController.getAllProducts);

export default router;
