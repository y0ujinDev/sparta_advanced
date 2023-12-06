import { prisma } from "../utils/prisma/index.js";

export class UsersRepository {
  // 회원가입
  signUp = async (email, password, name) => {
    const user = await prisma.users.create({
      data: {
        email,
        password,
        name,
      },
    });

    return user;
  };

  // 이메일로 사용자 찾기
  findUserByEmail = async (email) => {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    return user;
  };

  // 아이디로 사용자 찾기
  findUserById = async (id) => {
    const user = await prisma.users.findUnique({
      where: {
        id: +id,
      },
    });

    return user;
  };
}
