import { prisma } from "./../utils/prisma/index.js";

export class ProductsRepository {
  getAllProducts = async () => {
    return await prisma.products.findMany();
  };
}
