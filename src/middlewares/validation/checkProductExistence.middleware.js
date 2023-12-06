import { prisma } from "../../utils/prisma/index.js";
import { createError } from "../../utils/errorResponse.js";
import { StatusCodes, ErrorMessages } from "../../utils/constants/constants.js";

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
