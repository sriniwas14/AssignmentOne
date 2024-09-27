import { Router } from "express";
import { GetSettings, UpdateProfilePic, UpdateSettings } from "../controllers/user";

const userRouter = Router();

userRouter.post("/settings", UpdateSettings);
userRouter.get("/settings", GetSettings);
userRouter.post("/profile-picture", UpdateProfilePic);

export default userRouter;
