import express from "express";
import router from "./routers/index.js";
import LogMiddleware from "./middlewares/log.middleware.js";
import handleServerError from "./middlewares/error-handling.middleware.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

app.use(LogMiddleware);
app.use(express.json());
app.use("/api", router);
app.use(handleServerError);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
