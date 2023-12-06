import { UsersService } from "../services/users.service.js";
import { StatusCodes, SuccessMessages } from "../utils/constants/constants.js";

export class UsersController {
  usersSerivce = new UsersService();

  // 회원가입
  signUp = async (req, res, next) => {
    const { email, password, name } = req.body;
    try {
      const user = await this.usersSerivce.signUp(email, password, name);

      res.status(StatusCodes.CREATED).json({
        message: SuccessMessages.SIGNUP_SUCCESS,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  // 로그인
  login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await this.usersSerivce.login(email, password);

      res.status(StatusCodes.OK).json({
        message: SuccessMessages.LOGIN_SUCCESS,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  };

  // 사용자 정보 조회
  getUserInfo = async (req, res, next) => {
    try {
      const user = await this.usersSerivce.getUserInfo(res.locals.user.id);

      res.status(StatusCodes.OK).json({
        message: SuccessMessages.LOGIN_SUCCESS,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  };
}
