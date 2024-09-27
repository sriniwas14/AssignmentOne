"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwt = generateJwt;
exports.validateJwt = validateJwt;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function generateJwt(payload) {
    return jsonwebtoken_1.default.sign(payload, config_1.JWT_KEY);
}
function validateJwt(token) {
    const data = jsonwebtoken_1.default.verify(token, config_1.JWT_KEY);
    return data;
}
