import { prisma } from "../../utils/prisma/index.js";
import { createError } from "../../utils/errorResponse.js";
import { StatusCodes, ErrorMessages } from "../../utils/constants/constants.js";

// 상품의 존재 여부를 확인하는 미들웨어
export const checkProductExistence = async (req, res, next) => {
  const id = req.params.productId;
  const product = await prisma.products.findFirst({
    where: { id: +id },
  });

  if (!product) {
    return next(
      createError(StatusCodes.NOT_FOUND, ErrorMessages.PRODUCT_NOT_FOUND)
    );
  }

  req.product = product;

  next();
};
