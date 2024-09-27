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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const models_1 = require("./models");
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const authChecker_1 = __importDefault(require("./middlewares/authChecker"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create the `static` folder if not present
        const uploadsDir = path_1.default.join(__dirname + "/" + config_1.UPLOAD_DIR, 'static');
        if (!fs_1.default.existsSync(uploadsDir)) {
            fs_1.default.mkdirSync(uploadsDir);
        }
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use((0, cors_1.default)());
        yield (0, models_1.initDb)();
        app.use('/static', express_1.default.static(uploadsDir));
        app.use("/auth", auth_1.default);
        app.use(authChecker_1.default);
        app.use("/user", user_1.default);
        app.use(errorHandler_1.default);
        app.listen(config_1.PORT, () => console.log("Server started on port", config_1.PORT));
    });
}
main();
