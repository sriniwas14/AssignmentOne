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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authChecker;
const jwt_1 = require("../utils/jwt");
function authChecker(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        // Handle token validation logic
        const token = (_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")) === null || _b === void 0 ? void 0 : _b[1];
        if (!token) {
            res.send({ success: false, message: "unauthorized" });
            return;
        }
        const decodedToken = (0, jwt_1.validateJwt)(token);
        req.user = decodedToken;
        if (!token) {
            res.send({ success: false, message: "invalid token" });
            return;
        }
        next();
    });
}
