import { jest } from "@jest/globals";
import { UsersService } from "../../../src/services/users.service.js";
import { ErrorMessages } from "../../../src/utils/constants/constants.js";
import {
  hashPassword,
  comparePassword
} from "../../../src/utils/passwordUtils";

let mockUsersRepository = {
  findUserByEmail: jest.fn(),
  createUser: jest.fn(),
  findUserById: jest.fn()
};

let usersService = new UsersService(mockUsersRepository);

describe("Users Service Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("signUp Method", async () => {
    const mockUser = {
      name: "test",
      email: "test@test.com",
      createdAt: new Date()
    };
    mockUsersRepository.findUserByEmail.mockResolvedValue(null);
    mockUsersRepository.createUser.mockResolvedValue(mockUser);

    const user = await usersService.signUp("test@test.com", "password", "test");
    expect(user).toEqual(mockUser);
    expect(mockUsersRepository.createUser).toHaveBeenCalledWith(
      "test@test.com",
      expect.any(String),
      "test"
    );
  });

  test("signUp Method - User already exists", async () => {
    mockUsersRepository.findUserByEmail.mockResolvedValue(true);

    await expect(
      usersService.signUp("test@test.com", "password", "test")
    ).rejects.toThrow(ErrorMessages.ALREADY_REGISTERED);
  });

  test("login Method", async () => {
    const hashedPassword = await hashPassword("password");

    const mockUser = {
      id: 1,
      name: "test",
      email: "test@test.com",
      password: hashedPassword,
      createdAt: new Date()
    };
    mockUsersRepository.findUserByEmail.mockResolvedValue(mockUser);

    const userWithToken = await usersService.login("test@test.com", "password");
    expect(userWithToken).toHaveProperty("user");
    expect(userWithToken).toHaveProperty("token");
    expect(userWithToken.user).toEqual(
      expect.objectContaining({
        name: mockUser.name,
        email: mockUser.email,
        createdAt: mockUser.createdAt
      })
    );
  });

  test("login Method - User not found", async () => {
    mockUsersRepository.findUserByEmail.mockResolvedValue(null);

    await expect(
      usersService.login("test@test.com", "password")
    ).rejects.toThrow(ErrorMessages.USER_NOT_FOUND);
  });

  test("getUserInfo Method", async () => {
    const mockUser = {
      id: 1,
      name: "test",
      email: "test@test.com",
      createdAt: new Date()
    };
    mockUsersRepository.findUserById.mockResolvedValue(mockUser);

    const user = await usersService.getUserInfo(1);
    expect(user).toEqual(
      expect.objectContaining({
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email
      })
    );
  });
});
