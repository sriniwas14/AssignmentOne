import { Router } from "express";
import { SignUp, SignIn } from '../controllers/user';

const userRouter = Router();

userRouter.post("/signup", SignUp)
userRouter.post("/signin", SignIn)

export default userRouter
