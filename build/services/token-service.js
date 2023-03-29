"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const accessKey = process.env.ACCESS_KEY || '';
const refreshKey = process.env.REFRESH_KEY || '';
class TokenService {
    constructor() {
        this.generateToken = (payload) => {
            const accessToken = jsonwebtoken_1.default.sign(payload, accessKey, {
                expiresIn: '1y' // For Testing
            });
            const refreshToken = jsonwebtoken_1.default.sign(payload, refreshKey, {
                expiresIn: '1y'
            });
            return { accessToken, refreshToken };
        };
        this.verifyAccessToken = (token) => jsonwebtoken_1.default.verify(token, accessKey);
        this.verifyRefreshToken = (token) => jsonwebtoken_1.default.verify(token, refreshKey);
    }
}
exports.default = new TokenService;
