import { prisma } from "./../utils/prisma/index.js";
import { Status } from "../utils/constants/constants.js";

export class ProductsRepository {
  // 전체 상품 목록 조회
  getAllProducts = async () => {
    return await prisma.products.findMany();
  };

  // 상품 상세 조회
  getProductDetail = async (productId) => {
    return await prisma.products.findUnique({
      where: {
        id: +productId,
      },
    });
  };

  // 상품 등록
  createProduct = async (userId, title, content) => {
    return await prisma.products.create({
      data: {
        userId,
        title,
        content,
        status: Status.SELLING,
      },
    });
  };
}
