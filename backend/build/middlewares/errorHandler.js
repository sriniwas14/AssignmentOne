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
const zod_1 = require("zod");
function errorHandler(err, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.error(err);
        if (err instanceof zod_1.ZodError) {
            const firstErr = err.errors[0];
            res.status(401).send({
                success: false,
                message: `Field '${firstErr.path}' is ${firstErr.message}`,
            });
        }
        else {
            res.status(500).send({
                status: false,
                message: "something went wrong!",
            });
        }
    });
}
exports.default = errorHandler;
