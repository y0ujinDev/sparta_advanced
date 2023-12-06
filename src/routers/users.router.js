import express from "express";
import { UsersController } from "../controllers/users.controller.js";
import validateSignup from "./../middlewares/validate/validateSignup.middleware.js";
import validateLogin from "./../middlewares/validate/validateLogin.middleware.js";

const router = express.Router();
const usersController = new UsersController();

// 회원가입
router.post("/signup", validateSignup, usersController.signUp);

// 로그인
router.post("/login", validateLogin, usersController.login);

export default router;
