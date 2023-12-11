import jwt from "jsonwebtoken";
import { prisma } from "../../utils/prisma/index.js";
import { StatusCodes, ErrorMessages } from "../../utils/constants/constants.js";
import { createError } from "../../utils/errorResponse.js";

/// 토큰 유효성 검사
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: ErrorMessages.MISSING_TOKEN
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.userId) {
      throw createError(StatusCodes.UNAUTHORIZED, ErrorMessages.INVALID_TOKEN);
    }

    res.locals.decoded = decoded;

    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: ErrorMessages.TOKEN_EXPIRED
      });
    } else if (err instanceof JsonWebTokenError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: ErrorMessages.TOKEN_VERIFICATION_FAILED
      });
    } else {
      next(err);
    }
  }
};

// 사용자 유효성 검사
export const authenticateUser = async (req, res, next) => {
  try {
    const userId = res.locals.decoded.userId;

    if (!userId) {
      throw createError(StatusCodes.UNAUTHORIZED, ErrorMessages.MISSING_TOKEN);
    }

    const user = await prisma.users.findUnique({
      where: { id: +userId }
    });

    if (!user) {
      throw createError(StatusCodes.UNAUTHORIZED, ErrorMessages.INVALID_USER);
    }

    res.locals.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
