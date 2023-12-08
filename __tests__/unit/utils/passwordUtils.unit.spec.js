import { describe, expect } from "@jest/globals";
import {
  hashPassword,
  comparePassword
} from "../../../src/utils/passwordUtils";

describe("Password hasing and comparison Test", () => {
  const testPassword = "password";

  it("should hash the password correctly", async () => {
    const hashedPassword = await hashPassword(testPassword);
    expect(hashedPassword).not.toEqual(testPassword);
  });

  it("should returm true when the hashed password and the original password", async () => {
    const hashedPassword = await hashPassword(testPassword);
    const comparisonResult = await comparePassword(
      testPassword,
      hashedPassword
    );
    expect(comparisonResult).toBeTruthy();
  });

  it("should return false when the hashed password and a wrong password do not match", async () => {
    const hashedPassword = await hashPassword(testPassword);
    const comparisonResult = await comparePassword(
      "wrongPassword",
      hashedPassword
    );
    expect(comparisonResult).toBeFalsy();
  });
});
