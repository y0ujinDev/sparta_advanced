import { jest } from "@jest/globals";
import { ProductsService } from "../../../src/services/products.service";
import { Status } from "../../../src/utils/constants/constants.js";

let mockProductsRepository = {
  findAllProducts: jest.fn(),
  findProductById: jest.fn(),
  createProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn()
};

let productsService = new ProductsService(mockProductsRepository);

describe("Products Service Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("getAllProducts Method", async () => {
    const mockProducts = [{ id: 1, title: "test product" }];
    mockProductsRepository.findAllProducts.mockResolvedValue(mockProducts);

    const products = await productsService.getAllProducts();
    expect(products).toEqual(mockProducts);
    expect(mockProductsRepository.findAllProducts).toHaveBeenCalled();
  });

  test("getProductDetail Method", async () => {
    const mockProduct = { id: 1, title: "test product" };
    mockProductsRepository.findProductById.mockResolvedValue(mockProduct);

    const product = await productsService.getProductDetail(1);
    expect(product).toEqual(mockProduct);
    expect(mockProductsRepository.findProductById).toHaveBeenCalledWith(1);
  });

  test("createProduct Method", async () => {
    const mockProduct = {
      id: 1,
      title: "test product",
      userId: 1,
      content: "test content"
    };
    mockProductsRepository.createProduct.mockResolvedValue(mockProduct);

    const product = await productsService.createProduct(
      1,
      "test product",
      "test content"
    );
    expect(product).toEqual(mockProduct);
    expect(mockProductsRepository.createProduct).toHaveBeenCalledWith(
      1,
      "test product",
      "test content"
    );
  });

  test("updateProduct Method", async () => {
    const mockProduct = {
      id: 1,
      title: "updated product",
      content: "updated content",
      status: Status.SELLING
    };
    mockProductsRepository.updateProduct.mockResolvedValue(mockProduct);

    const product = await productsService.updateProduct(
      1,
      "updated product",
      "updated content",
      Status.SELLING
    );
    expect(product).toEqual(mockProduct);
    expect(mockProductsRepository.updateProduct).toHaveBeenCalledWith(
      1,
      "updated product",
      "updated content",
      Status.SELLING
    );
  });

  test("deleteProduct Method", async () => {
    await productsService.deleteProduct(1);
    expect(mockProductsRepository.deleteProduct).toHaveBeenCalledWith(1);
  });
});
