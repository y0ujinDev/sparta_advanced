import { compare } from "bcryptjs";

// 해시화된 비밀번호와 사용자가 입력한 비밀번호를 비교하는 함수
export const comparePassword = async (password, hashedPassword) => {
  return await compare(password, hashedPassword);
};
