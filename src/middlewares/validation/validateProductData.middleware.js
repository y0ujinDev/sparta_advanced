import { createError } from "../../utils/errorResponse.js";
import { StatusCodes, ErrorMessages } from "../../utils/constants/constants.js";

export const validateProductData = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return next(
      createError(StatusCodes.BAD_REQUEST, ErrorMessages.INVALID_DATA)
    );
  }
  next();
};
