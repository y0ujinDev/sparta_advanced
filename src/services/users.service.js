import { UsersRepository } from "../repositories/users.repository.js";
import { StatusCodes, ErrorMessages } from "../utils/constants/constants.js";
import { createError } from "../utils/errorResponse.js";

export class UsersService {
  usersRepository = new UsersRepository();

  // 회원가입
  signUp = async (email, password, name) => {
    // 이메일 중복 확인
    const existingUser = await this.usersRepository.findUserByEmail(email);

    if (existingUser) {
      throw createError(StatusCodes.CONFLICT, ErrorMessages.ALREADY_REGISTERED);
    }

    const user = await this.usersRepository.signUp(email, password, name);

    return {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  };
}
