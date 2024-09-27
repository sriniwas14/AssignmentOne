"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPassword = exports.SignIn = exports.SignUp = void 0;
const express_1 = require("../utils/express");
const user_1 = require("../validators/user");
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../utils/jwt");
const password_1 = require("../utils/password");
exports.SignUp = (0, express_1.Controller)(signUp);
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield user_1.signUpValidator.parseAsync(req.body);
        const userExists = yield User_1.default.findOne({
            where: { email: data.email },
        });
        if (userExists) {
            res.send({
                success: false,
                message: "user exists",
            });
            return;
        }
        const hash = yield (0, password_1.hashPassword)(data.password);
        const user = yield User_1.default.create(Object.assign(Object.assign({}, data), { password: hash }));
        const token = (0, jwt_1.generateJwt)({
            userId: user.id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            avatar: user.avatar,
        });
        res.send({ success: true, token });
    });
}
exports.SignIn = (0, express_1.Controller)(signIn);
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield user_1.signInValidator.parseAsync(req.body);
        const user = yield User_1.default.findOne({
            where: { email: data.email },
        });
        if (!user) {
            res.send({
                success: false,
                message: "invalid username or password",
            });
            return;
        }
        const matched = yield (0, password_1.validatePassword)(data.password, user.getDataValue("password"));
        if (!matched) {
            res.send({
                success: false,
                message: "invalid username or password",
            });
            return;
        }
        const token = (0, jwt_1.generateJwt)({
            userId: user.id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            avatar: user.avatar,
        });
        res.send({ success: true, token });
    });
}
exports.ResetPassword = (0, express_1.Controller)(resetPassword);
function resetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield user_1.resetPasswordValidator.parseAsync(req.body);
        const user = yield User_1.default.findOne({
            where: { email: data.email },
        });
        if (!user) {
            res.send({
                success: false,
                message: "user not found",
            });
            return;
        }
        const hash = yield (0, password_1.hashPassword)(data.password);
        User_1.default.update({
            password: hash,
        }, {
            where: {
                id: user.id,
            },
        });
        res.send({ success: true });
    });
}
