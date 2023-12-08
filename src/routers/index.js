import express from "express";
import UsersRouter from "./users.router.js";
import ProductsRouter from "./products.router.js";

const router = express.Router();

router.use("/users/", UsersRouter);
router.use("/products/", ProductsRouter);

export default router;
