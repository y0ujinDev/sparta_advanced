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
}
