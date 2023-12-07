import request from "supertest";
import express from "express";
import { checkProductExistence } from "./checkProductExistence.middleware.js";
import handleServerError from "../../middlewares/error-handling.middleware.js";
import { prisma } from "../../utils/prisma/index.js";

jest.mock("../../utils/prisma/index.js", () => ({
  __esModule: true,
  prisma: {
    products: {
      findFirst: jest.fn(),
    },
  },
}));

describe("checkProductExistence middleware", () => {
  let app;

  beforeEach(() => {
    app = express();

    app.use("/:productId", checkProductExistence);

    app.use((req, res) => {
      res.status(200).json({ product: req.product });
    });

    app.use(handleServerError);
  });

  it("should return 404 if product does not exist", async () => {
    prisma.products.findFirst.mockResolvedValue(null);

    const res = await request(app).get("/1");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("상품을 찾을 수 없습니다.");
  });

  it("should pass product to req if product exists", async () => {
    const mockProduct = { id: 1, name: "Test Product" };
    prisma.products.findFirst.mockResolvedValue(mockProduct);

    const res = await request(app).get("/1");

    expect(res.status).toBe(200);
    expect(res.body.product).toEqual(mockProduct);
  });
});
