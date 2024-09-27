"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = Controller;
function Controller(handler) {
    return (req, res, next) => {
        handler(req, res).catch(err => next(err));
    };
}
