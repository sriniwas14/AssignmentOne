"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPLOAD_DIR = exports.JWT_KEY = exports.DB_URI = exports.PORT = void 0;
exports.PORT = process.env.PORT || 8080;
exports.DB_URI = process.env.DB_URI || 'postgres://postgres:mysecretpassword@localhost:5432/testdbone?sslmode=disable';
exports.JWT_KEY = process.env.JWT_KEY || 'supersecret';
exports.UPLOAD_DIR = process.env.UPLOAD_DIR || '../';
