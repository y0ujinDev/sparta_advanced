import {
  StatusCodes,
  ErrorMessages,
  TokenInfo
} from "../utils/constants/constants.js";
import { createError } from "../utils/errorResponse.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import jwt from "jsonwebtoken";

export class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  // 사용자 등록
  signUp = async (email, password, name) => {
    // 이메일 중복 확인
    const existingUser = await this.usersRepository.findUserByEmail(email);

    if (existingUser) {
      throw createError(StatusCodes.CONFLICT, ErrorMessages.ALREADY_REGISTERED);
    }

    const hashedPassword = await hashPassword(password);

    const user = await this.usersRepository.createUser(
      email,
      hashedPassword,
      name
    );

    return {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };
  };

  // 사용자 로그인
  login = async (email, password) => {
    const user = await this.handleLogin(email, password);
    const token = this.generateToken(user.id);

    return {
      user: {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      },
      token
    };
  };

  // 사용자 정보 조회
  getUserInfo = async userId => {
    const user = await this.usersRepository.findUserById(userId);
    const { id, name, email } = user;

    return { id, name, email };
  };

  // 토큰 생성
  generateToken = userId => {
    const expiresIn = TokenInfo.EXPIRATION_TIME;
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw createError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorMessages.NO_SECRET_KEY
      );
    }

    const accessToken = jwt.sign({ userId }, secret, {
      expiresIn
    });

    return { accessToken, expiresIn };
  };

  // 로그인 처리
  handleLogin = async (email, password) => {
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw createError(StatusCodes.BAD_REQUEST, ErrorMessages.USER_NOT_FOUND);
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      throw createError(
        StatusCodes.UNAUTHORIZED,
        ErrorMessages.INVALID_PASSWORD
      );
    }

    return user;
  };
}
