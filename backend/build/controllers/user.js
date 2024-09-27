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
exports.UpdateProfilePic = exports.UpdateSettings = exports.GetSettings = void 0;
const express_1 = require("../utils/express");
const user_1 = require("../validators/user");
const User_1 = __importDefault(require("../models/User"));
const busboy_1 = __importDefault(require("busboy"));
const config_1 = require("../config");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.GetSettings = (0, express_1.Controller)(getSettings);
function getSettings(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.findByPk(req.user.userId);
        res.send({
            success: true,
            data: {
                firstName: user === null || user === void 0 ? void 0 : user.firstName,
                lastName: user === null || user === void 0 ? void 0 : user.lastName,
                email: user === null || user === void 0 ? void 0 : user.email,
                avatar: user === null || user === void 0 ? void 0 : user.avatar
            }
        });
    });
}
exports.UpdateSettings = (0, express_1.Controller)(updateSettings);
function updateSettings(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield user_1.updateSettingsValidator.parseAsync(req.body);
        const [updatedCount, [user]] = yield User_1.default.update({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
        }, {
            where: {
                id: req.user.userId
            },
            returning: true,
        });
        if (updatedCount === 0) {
            res.status(500).send({ success: false });
            return;
        }
        res.send({
            success: true,
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        });
    });
}
exports.UpdateProfilePic = (0, express_1.Controller)(updateProfilePic);
function updateProfilePic(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const busboy = (0, busboy_1.default)({ headers: req.headers });
        const uploadsDir = path_1.default.join(__dirname + "/../" + config_1.UPLOAD_DIR, 'static');
        const filename = crypto.randomUUID() + ".jpg";
        let uploadPath = "";
        busboy.on('file', (name, file, info) => {
            console.log(info.mimeType);
            if (info.mimeType !== "image/jpeg") {
                res.send({ success: false, message: "please upload a png file" });
                return;
            }
            uploadPath = path_1.default.join(uploadsDir, filename);
            const writeStream = fs_1.default.createWriteStream(uploadPath);
            file.pipe(writeStream);
        });
        busboy.on('finish', () => __awaiter(this, void 0, void 0, function* () {
            if (!uploadPath) {
                return res.status(400).json({ message: 'No file uploaded.' });
            }
            const [updatedCount] = yield User_1.default.update({ avatar: filename }, {
                where: {
                    id: req.user.userId
                }
            });
            if (updatedCount === 0) {
                res.status(500).send({ success: false });
                return;
            }
            res.status(200).send({
                success: true,
                message: 'File uploaded successfully!',
                data: {
                    avatar: filename,
                }
            });
        }));
        req.pipe(busboy);
    });
}
