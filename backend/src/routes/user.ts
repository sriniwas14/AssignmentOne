import { Router } from "express";
import { UpdateSettings } from "../controllers/user";

const userRouter = Router();

userRouter.post("/settings", UpdateSettings);

export default userRouter;
