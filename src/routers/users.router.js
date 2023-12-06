import express from "express";
import { UsersController } from "../controllers/users.controller.js";
import validateSignup from "./../middlewares/validate/validateSignup.middleware.js";

const router = express.Router();
const usersController = new UsersController();

// 회원가입
router.post("/signup", validateSignup, usersController.signUp);

export default router;
