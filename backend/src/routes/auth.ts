import { Router } from "express";
import { SignUp, SignIn, ResetPassword } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/signup", SignUp);
authRouter.post("/signin", SignIn);
authRouter.post("/reset-password", ResetPassword);

export default authRouter;
