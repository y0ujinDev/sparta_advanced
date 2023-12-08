import { ProductsController } from "../../../src/controllers/products.controller";
import {
  StatusCodes,
  SuccessMessages,
} from "../../../src/utils/constants/constants.js";

let mockProductsService = {
  getAllProducts: jest.fn(),
  getProductDetail: jest.fn(),
  createProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
};

let productsController = new ProductsController(mockProductsService);

describe("Products Controller Unit Test", () => {
  let mockRequest = {};
  let mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
  };
  let mockNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAllProducts Method", async () => {
    const mockProducts = [{ id: 1, title: "test" }];
    mockProductsService.getAllProducts.mockResolvedValue(mockProducts);

    await productsController.getAllProducts(
      mockRequest,
      mockResponse,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith(mockProducts);
  });

  test("getProductDetail Method", async () => {
    const mockProduct = { id: 1, title: "test" };
    mockProductsService.getProductDetail.mockResolvedValue(mockProduct);
    mockRequest.params = { productId: 1 };

    await productsController.getProductDetail(
      mockRequest,
      mockResponse,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith(mockProduct);
  });

  test("createProduct Method", async () => {
    const mockProduct = { id: 1, title: "test", content: "test content" };
    mockProductsService.createProduct.mockResolvedValue(mockProduct);
    mockRequest.body = { title: "test", content: "test content" };
    mockResponse.locals = { user: { id: 1 } };

    await productsController.createProduct(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: SuccessMessages.PRODUCT_CREATED,
      data: mockProduct,
    });
  });

  test("updateProduct Method", async () => {
    const mockProduct = {
      id: 1,
      title: "updated",
      content: "updated content",
      status: "selling",
    };
    mockProductsService.updateProduct.mockResolvedValue(mockProduct);
    mockRequest.body = {
      title: "updated",
      content: "updated content",
      status: "selling",
    };
    mockRequest.params = { productId: 1 };

    await productsController.updateProduct(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: SuccessMessages.PRODUCT_UPDATED,
      data: mockProduct,
    });
  });

  test("deleteProduct Method", async () => {
    mockProductsService.deleteProduct.mockResolvedValue();
    mockRequest.params = { productId: 1 };

    await productsController.deleteProduct(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: SuccessMessages.PRODUCT_DELETED,
    });
  });
});
