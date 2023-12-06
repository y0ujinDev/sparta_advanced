import express from "express";
import AuthRouter from "./auth.router.js";
import PostsRouter from "./posts.router.js";
import UsersRouter from "./users.router.js";

const router = express.Router();

router.use("/auth/", AuthRouter);
router.use("/posts/", PostsRouter);
router.use("/users/", UsersRouter);

export default router;
