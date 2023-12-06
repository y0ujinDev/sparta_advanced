import { ProductsRepository } from "../repositories/products.repository.js";
import { ErrorMessages, StatusCodes } from "../utils/constants/constants.js";
import { createError } from "../utils/errorResponse.js";

export class ProductsService {
  productsRepository = new ProductsRepository();

  // 전체 상품 목록 조회
  getAllProducts = async () => {
    const products = await this.productsRepository.getAllProducts();

    if (!products || products.length === 0) {
      throw createError(StatusCodes.NOT_FOUND, ErrorMessages.PRODUCT_NOT_FOUND);
    }

    return products;
  };

  // 상품 상세 조회
  getProductDetail = async (productId) => {
    const product = await this.productsRepository.getProductDetail(productId);

    if (!product) {
      throw createError(StatusCodes.NOT_FOUND, ErrorMessages.PRODUCT_NOT_FOUND);
    }

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
}
