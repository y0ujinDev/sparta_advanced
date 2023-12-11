import { StatusCodes } from "../utils/constants/constants.js";

export class UsersController {
  constructor(usersSerivce) {
    this.usersSerivce = usersSerivce;
  }

  // 회원가입
  signUp = async (req, res, next) => {
    const { email, password, name } = req.body;
    try {
      const user = await this.usersSerivce.signUp(email, password, name);

      res.status(StatusCodes.CREATED).json({
        message: "회원가입에 성공했습니다.",
        data: user
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
        message: "로그인에 성공했습니다.",
        data: user
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
        message: "사용자 정보 조회에 성공했습니다.",
        data: user
      });
    } catch (err) {
      next(err);
    }
  };
}
