import { prisma } from "./../utils/prisma/index.js";
import { Status } from "../utils/constants/constants.js";

export class ProductsRepository {
  getAllProducts = async () => {
    return await prisma.products.findMany();
  };

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
