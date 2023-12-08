import {
  StatusCodes,
  Status,
  SuccessMessages,
} from "../utils/constants/constants.js";

export class ProductsController {
  constructor(productsService) {
    this.productsService = productsService;
  }

  // 전체 상품 목록 조회
  getAllProducts = async (req, res, next) => {
    try {
      const products = await this.productsService.getAllProducts();

      return res.status(StatusCodes.OK).json(products);
    } catch (err) {
      next(err);
    }
  };

  // 상품 상세 조회
  getProductDetail = async (req, res, next) => {
    const { productId } = req.params;
    try {
      const product = await this.productsService.getProductDetail(productId);

      return res.status(StatusCodes.OK).json(product);
    } catch (err) {
      next(err);
    }
  };

  // 상품 등록
  createProduct = async (req, res, next) => {
    const { title, content } = req.body;
    const userId = res.locals.user.id;
    try {
      const product = await this.productsService.createProduct(
        userId,
        title,
        content
      );

      return res.status(StatusCodes.CREATED).json({
        message: SuccessMessages.PRODUCT_CREATED,
        data: product,
      });
    } catch (err) {
      next(err);
    }
  };

  // 상품 수정
  updateProduct = async (req, res, next) => {
    const { title, content, status = Status.SELLING } = req.body;
    const { productId } = req.params;
    try {
      const product = await this.productsService.updateProduct(
        productId,
        title,
        content,
        status
      );

      return res.status(StatusCodes.OK).json({
        message: SuccessMessages.PRODUCT_UPDATED,
        data: product,
      });
    } catch (err) {
      next(err);
    }
  };

  // 상품 삭제
  deleteProduct = async (req, res, next) => {
    const { productId } = req.params;
    try {
      await this.productsService.deleteProduct(productId);

      return res.status(StatusCodes.OK).json({
        message: SuccessMessages.PRODUCT_DELETED,
      });
    } catch (err) {
      next(err);
    }
  };
}
