import { ProductsRepository } from "../repositories/products.repository.js";
import { ErrorMessages, StatusCodes } from "../utils/constants/constants.js";
import { createError } from "../utils/errorResponse.js";

export class ProductsService {
  productsRepository = new ProductsRepository();

  getAllProducts = async () => {
    const products = await this.productsRepository.getAllProducts();

    if (!products || products.length === 0) {
      throw createError(StatusCodes.NOT_FOUND, ErrorMessages.PRODUCT_NOT_FOUND);
    }

    return products;
  };
}
