import { jest } from "@jest/globals";
import { ProductsRepository } from "../../../src/repositories/products.repository";

let mockPrisma = {
  products: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

let productsRepository = new ProductsRepository(mockPrisma);

describe("Products Repository Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("getAllProducts Method", async () => {
    const mockProducts = [{ id: 1, title: "test product" }];
    mockPrisma.products.findMany.mockResolvedValue(mockProducts);

    const products = await productsRepository.getAllProducts();
    expect(products).toEqual(mockProducts);
    expect(mockPrisma.products.findMany).toHaveBeenCalled();
  });

  test("getProductDetail Method", async () => {
    const mockProduct = { id: 1, title: "test product" };
    mockPrisma.products.findUnique.mockResolvedValue(mockProduct);

    const product = await productsRepository.getProductDetail(1);
    expect(product).toEqual(mockProduct);
    expect(mockPrisma.products.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  test("createProduct Method", async () => {
    const mockProduct = {
      id: 1,
      title: "test product",
      userId: 1,
      content: "test content",
    };
    mockPrisma.products.create.mockResolvedValue(mockProduct);

    const product = await productsRepository.createProduct(
      1,
      "test product",
      "test content"
    );
    expect(product).toEqual(mockProduct);
    expect(mockPrisma.products.create).toHaveBeenCalled();
  });

  test("updateProduct Method", async () => {
    const mockProduct = {
      id: 1,
      title: "updated product",
      content: "updated content",
      status: "FOR_SALE",
    };
    mockPrisma.products.update.mockResolvedValue(mockProduct);

    const product = await productsRepository.updateProduct(
      1,
      "updated product",
      "updated content",
      "FOR_SALE"
    );
    expect(product).toEqual(mockProduct);
    expect(mockPrisma.products.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        title: "updated product",
        content: "updated content",
        status: "FOR_SALE",
      },
    });
  });

  test("deleteProduct Method", async () => {
    mockPrisma.products.delete.mockResolvedValue({ id: 1 });

    await productsRepository.deleteProduct(1);
    expect(mockPrisma.products.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
