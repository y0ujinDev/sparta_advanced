import { jest } from "@jest/globals";
import { UsersService } from "../../../src/services/users.service";
import * as passwordUtils from "../../../src/utils/passwordUtils.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

let mockUsersRepository = {
  findUserByEmail: jest.fn(),
  findUserById: jest.fn(),
  signUp: jest.fn(),
};

let usersService = new UsersService(mockUsersRepository);

describe("Users Service Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest
      .spyOn(passwordUtils, "hashPassword")
      .mockResolvedValue("hashedPassword");
    jest.spyOn(passwordUtils, "comparePassword").mockResolvedValue(true);
  });

  test("signUp Method", async () => {
    const mockUser = {
      id: 1,
      email: "test@gmail.com",
      password: "hashedPassword",
      name: "test",
      createdAt: new Date(),
    };
    mockUsersRepository.findUserByEmail.mockResolvedValue(null);
    mockUsersRepository.signUp.mockResolvedValue(mockUser);

    const user = await usersService.signUp(
      "test@gmail.com",
      "password",
      "test"
    );
    expect(user).toEqual({
      name: "test",
      email: "test@gmail.com",
      createdAt: mockUser.createdAt,
    });
    expect(mockUsersRepository.findUserByEmail).toHaveBeenCalledWith(
      "test@gmail.com"
    );
    expect(mockUsersRepository.signUp).toHaveBeenCalledWith(
      "test@gmail.com",
      "hashedPassword",
      "test"
    );
  });

  test("login Method", async () => {
    const mockUser = {
      id: 1,
      email: "test@gmail.com",
      password: "hashedPassword",
      name: "test",
      createdAt: new Date(),
    };
    mockUsersRepository.findUserByEmail.mockResolvedValue(mockUser);

    const result = await usersService.login("test@gmail.com", "password");
    expect(result.user).toEqual({
      name: "test",
      email: "test@gmail.com",
      createdAt: mockUser.createdAt,
    });
    expect(result.token).toBeDefined();
    expect(mockUsersRepository.findUserByEmail).toHaveBeenCalledWith(
      "test@gmail.com"
    );
  });

  test("getUserInfo Method", async () => {
    const mockUser = {
      id: 1,
      email: "test@gmail.com",
      password: "password",
      name: "test",
    };
    mockUsersRepository.findUserById.mockResolvedValue(mockUser);

    const user = await usersService.getUserInfo(1);
    expect(user).toEqual({
      id: 1,
      name: "test",
      email: "test@gmail.com",
    });
    expect(mockUsersRepository.findUserById).toHaveBeenCalledWith(1);
  });
});
