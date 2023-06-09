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
const crypto_1 = __importDefault(require("crypto"));
const otp_model_1 = __importDefault(require("../models/otp-model"));
class OtpService {
    constructor() {
        this.generateOtp = () => crypto_1.default.randomInt(100000, 999999).toString();
        this.createOtp = (data) => __awaiter(this, void 0, void 0, function* () { return yield otp_model_1.default.create(data); });
        this.findOtp = (filter) => __awaiter(this, void 0, void 0, function* () { return yield otp_model_1.default.findOne({ where: filter }); });
        this.destroyOtp = (filter) => __awaiter(this, void 0, void 0, function* () { return yield otp_model_1.default.destroy({ where: filter }); });
        this.verifyOtp = (filter) => __awaiter(this, void 0, void 0, function* () {
            const otp = yield otp_model_1.default.findOne({ where: filter });
            // if otp expired
            if (otp)
                yield this.destroyOtp(filter);
            return otp ? otp : false;
        });
    }
}
exports.default = new OtpService;
