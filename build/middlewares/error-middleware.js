"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __importDefault(require("../utils/constants"));
const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || constants_1.default.STATUS_CODE.SERVER_ERROR;
    err.message = err.message || constants_1.default.SERVER_MESSAGE.SERVER_ERROR;
    res.status(err.statusCode).json({ success: false, message: err.message });
};
exports.default = errorMiddleware;
