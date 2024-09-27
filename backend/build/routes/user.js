"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const userRouter = (0, express_1.Router)();
userRouter.post("/settings", user_1.UpdateSettings);
userRouter.get("/settings", user_1.GetSettings);
userRouter.post("/profile-picture", user_1.UpdateProfilePic);
exports.default = userRouter;
