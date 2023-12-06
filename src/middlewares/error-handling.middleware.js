import { StatusCodes, ErrorMessages } from "../utils/constants/constants.js";

// 서버 내부 오류를 처리하는 범용 미들웨어
const handleServerError = (err, req, res, next) => {
  console.error(err);
  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || ErrorMessages.SERVER_ERROR;
  res.status(status).json({ error: { message } });
};

export default handleServerError;
