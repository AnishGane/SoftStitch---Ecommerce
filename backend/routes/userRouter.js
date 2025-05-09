import express from "express";
import {
  loginUser,
  userRegister,
  adminLogin,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", userRegister);
userRouter.post("/admin-login", adminLogin);

export default userRouter;
