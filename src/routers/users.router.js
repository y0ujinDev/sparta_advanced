import express from "express";
import { prisma } from "../utils/prisma/index.js";
import { UsersController } from "../controllers/users.controller.js";
import { UsersService } from "../services/users.service.js";
import { UsersRepository } from "../repositories/users.repository.js";
import validateSignup from "./../middlewares/validation/validateSignup.middleware.js";
import validateLogin from "./../middlewares/validation/validateLogin.middleware.js";
import {
  verifyToken,
  authenticateUser,
} from "../middlewares/validation/validateToken.middleware.js";

const router = express.Router();
const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

// 회원가입
router.post("/signup", validateSignup, usersController.signUp);

// 로그인
router.post("/login", validateLogin, usersController.login);

// 사용자 정보 조회
router.get("/me", verifyToken, authenticateUser, usersController.getUserInfo);

export default router;
