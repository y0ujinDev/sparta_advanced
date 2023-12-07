import request from "supertest";
import express from "express";
import { checkProductOwner } from "./checkProductOwner.middleware.js";
import { prisma } from "../../utils/prisma/index.js";
import handleServerError from "../../middlewares/handleServerError.middleware.js";

jest.mock("../../utils/prisma/index.js", () => ({
  __esModule: true,
  prisma: {
    products: {
      findUnique: jest.fn(),
    },
  },
}));

describe("checkProductOwner middleware", () => {
  let app;

  beforeEach(() => {
    app = express();

    app.use("/:productId", (req, res, next) => {
      res.locals.user = { id: 1 };
      next();
    });

    app.use("/:productId", checkProductOwner);

    app.use((req, res) => {
      res.status(200).json({ product: req.product });
    });

    app.use(handleServerError);
  });

  it("should return 403 if the user does not own the product", async () => {
    prisma.products.findUnique.mockResolvedValue(null);

    const res = await request(app).get("/1");

    expect(res.status).toBe(403);
    expect(res.body.message).toBe("상품에 대한 접근 권한이 없습니다.");
  });

  it("should pass product to req if the user owns the product", async () => {
    const mockProduct = { id: 1, name: "Test Product", userId: 1 };
    prisma.products.findUnique.mockResolvedValue(mockProduct);

    const res = await request(app).get("/1");

    expect(res.status).toBe(200);
    expect(res.body.product).toEqual(mockProduct);
  });
});
