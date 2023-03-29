"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const otp_model_1 = __importDefault(require("../../models/otp-model"));
const user_model_1 = __importDefault(require("../../models/user-model"));
const config_1 = __importDefault(require("../config"));
require('./db');
const isDev = config_1.default.APP_ENV === 'development';
console.log("config.APP_ENV === 'development'", config_1.default.APP_ENV === 'development');
const dbInit = () => {
    user_model_1.default.sync({ alter: isDev });
    otp_model_1.default.sync({ alter: isDev });
};
exports.default = dbInit;
