import { jest } from "@jest/globals";
import { UsersRepository } from "../../../src/repositories/users.repository";

let mockPrisma = {
  users: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
};

let usersRepository = new UsersRepository(mockPrisma);

describe("Users Repository Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("signUp Method", async () => {
    const mockUser = {
      id: 1,
      email: "test@gmail.com",
      password: "password",
      name: "test",
    };
    mockPrisma.users.create.mockResolvedValue(mockUser);

    const user = await usersRepository.signUp(
      "test@gmail.com",
      "password",
      "test"
    );
    expect(user).toEqual(mockUser);
    expect(mockPrisma.users.create).toHaveBeenCalled();
  });

  test("findUserByEmail Method", async () => {
    const mockUser = {
      id: 1,
      email: "test@gmail.com",
      password: "password",
      name: "test",
    };
    mockPrisma.users.findUnique.mockResolvedValue(mockUser);

    const user = await usersRepository.findUserByEmail("test@gmail.com");
    expect(user).toEqual(mockUser);
    expect(mockPrisma.users.findUnique).toHaveBeenCalledWith({
      where: { email: "test@gmail.com" },
    });
  });

  test("findUserById Method", async () => {
    const mockUser = {
      id: 1,
      email: "test@gmail.com",
      password: "password",
      name: "test",
    };
    mockPrisma.users.findUnique.mockResolvedValue(mockUser);

    const user = await usersRepository.findUserById(1);
    expect(user).toEqual(mockUser);
    expect(mockPrisma.users.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
