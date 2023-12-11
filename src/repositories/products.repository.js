import { Status } from "../utils/constants/constants.js";

export class ProductsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // 전체 상품 목록 조회
  findAllProducts = async () => {
    return await this.prisma.products.findMany({
      orderBy: {
        updatedAt: "desc"
      }
    });
  };

  // 상품 상세 조회
  findProductById = async productId => {
    return await this.prisma.products.findUnique({
      where: {
        id: +productId
      }
    });
  };

  // 상품 등록
  createProduct = async (userId, title, content) => {
    return await this.prisma.products.create({
      data: {
        userId,
        title,
        content,
        status: Status.SELLING
      }
    });
  };

  // 상품 수정
  updateProduct = async (productId, title, content, status) => {
    return await this.prisma.products.update({
      where: {
        id: +productId
      },
      data: {
        title,
        content,
        status
      }
    });
  };

  // 상품 삭제
  deleteProduct = async productId => {
    await this.prisma.products.delete({
      where: {
        id: +productId
      }
    });
  };
}
