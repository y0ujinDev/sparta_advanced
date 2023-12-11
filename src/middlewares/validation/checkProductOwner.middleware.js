import { prisma } from "../../utils/prisma/index.js";
import { createError } from "../../utils/errorResponse.js";
import { StatusCodes, ErrorMessages } from "../../utils/constants/constants.js";

// 상품 소유자를 확인하는 미들웨어
export const checkProductOwner = async (req, res, next) => {
  const id = req.params.productId;
  const userId = res.locals.user.id;

  if (!product || product.userId !== +userId) {
    return next(
      createError(StatusCodes.FORBIDDEN, ErrorMessages.NO_PRODUCT_ACCESS)
    );
  }

  next();
};
