export class UsersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // 회원가입
  signUp = async (email, password, name) => {
    const user = await this.prisma.users.create({
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
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });

    return user;
  };

  // 아이디로 사용자 찾기
  findUserById = async (id) => {
    const user = await this.prisma.users.findUnique({
      where: {
        id: +id,
      },
    });

    return user;
  };
}
