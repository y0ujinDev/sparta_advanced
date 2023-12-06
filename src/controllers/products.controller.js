import { ProductsService } from "../services/products.service.js";
import { StatusCodes } from "../utils/constants/constants.js";

export class ProductsController {
  productsService = new ProductsService();

  getAllProducts = async (req, res, next) => {
    try {
      const products = await this.productsService.getAllProducts();

      return res.status(StatusCodes.OK).json(products);
    } catch (err) {
      next(err);
    }
  };

  createProduct = async (req, res, next) => {
    const { title, content } = req.body;
    const userId = res.locals.user.id;
    try {
      const product = await this.productsService.createProduct(
        userId,
        title,
        content
      );

      return res.status(StatusCodes.CREATED).json(product);
    } catch (err) {
      next(err);
    }
  };
}
