"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", auth_1.SignUp);
authRouter.post("/signin", auth_1.SignIn);
authRouter.post("/reset-password", auth_1.ResetPassword);
exports.default = authRouter;
