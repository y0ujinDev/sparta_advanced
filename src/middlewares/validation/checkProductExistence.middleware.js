import { createError } from "../../utils/errorResponse.js";
import { StatusCodes, ErrorMessages } from "../../utils/constants/constants.js";
import { ProductsRepository } from "./../../repositories/products.repository.js";
import { prisma } from "../../utils/prisma/index.js";

// 상품의 존재 여부를 확인하는 미들웨어
export const checkProductExistence = async (req, res, next) => {
  const id = req.params.productId;
  const productsRepository = new ProductsRepository(prisma);
  const product = await productsRepository.findProductById(id);

  if (!product) {
    return next(
      createError(StatusCodes.NOT_FOUND, ErrorMessages.PRODUCT_NOT_FOUND)
    );
  }

  req.product = product;

  next();
};
