import {
  ErrorMessages,
  Status,
  StatusCodes
} from "../utils/constants/constants.js";
import { createError } from "../utils/errorResponse.js";

export class ProductsService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  // 전체 상품 목록 조회
  getAllProducts = async () => {
    const products = await this.productsRepository.findAllProducts();

    return products || [];
  };

  // 상품 상세 조회
  getProductDetail = async productId => {
    const product = await this.productsRepository.findProductById(productId);

    return product;
  };

  // 상품 등록
  createProduct = async (userId, title, content) => {
    const product = await this.productsRepository.createProduct(
      userId,
      title,
      content
    );

    return product;
  };

  // 상품 수정
  updateProduct = async (productId, title, content, status) => {
    const product = await this.productsRepository.updateProduct(
      productId,
      title,
      content,
      status
    );

    if (status !== Status.SELLING && status !== Status.SOLD) {
      throw createError(StatusCodes.BAD_REQUEST, ErrorMessages.INVALID_DATA);
    }

    return product;
  };

  // 상품 삭제
  deleteProduct = async productId => {
    await this.productsRepository.deleteProduct(productId);
  };
}
