import { prisma } from "../../utils/prisma/index.js";
import { createError } from "../../utils/errorResponse.js";
import { StatusCodes, ErrorMessages } from "../../utils/constants/constants.js";

// 상품 소유자를 확인하는 미들웨어
export const checkProductOwner = async (req, res, next) => {
  const id = req.params.productId;
  const userId = res.locals.user.id;
  const product = await prisma.products.findUnique({
    where: {
      id: +id,
      userId: +userId,
    },
  });

  if (!product) {
    return next(
      createError(StatusCodes.FORBIDDEN, ErrorMessages.NO_PRODUCT_ACCESS)
    );
  }

  req.product = product;

  next();
};
