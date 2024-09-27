"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettingsValidator = exports.resetPasswordValidator = exports.signInValidator = exports.signUpValidator = void 0;
const zod_1 = require("zod");
exports.signUpValidator = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    organization: zod_1.z.string(),
    email: zod_1.z.string(),
    password: zod_1.z.string().min(6)
});
exports.signInValidator = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string().min(6)
});
exports.resetPasswordValidator = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string().min(6)
});
exports.updateSettingsValidator = zod_1.z.object({
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
}).refine(data => data.firstName || data.lastName || data.email, {
    message: "no fields received"
});
