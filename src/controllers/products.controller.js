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
}
