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
const axios_1 = __importDefault(require("axios"));
class SmsService {
    constructor() {
        this.sendOtp = (data) => __awaiter(this, void 0, void 0, function* () {
            const text = `EgPaid never calls you asking for OTP. Don't share your OTP with anyone. Your OTP is ${data.otp} Valid for 3 min, ID:78799gdg`;
            const payload = {
                mobile: data.mobile,
                text
            };
            return yield this.sendSms(payload);
        });
        /**
         * TEMPRORY DEFINING THE FUNCTION LIKE THIS
         * WE CAN EASILY UTILISE THIS FUNCTION
         */
        this.sendSms = (data) => __awaiter(this, void 0, void 0, function* () {
            const url = `http://182.18.143.11/api/mt/SendSMS?apikey=xzj3uC95O0qk5MxB6tO1Gg&senderid=EGPAID&channel=TRANS&DCS=0&flashs ms=0&number=${data.mobile}&text=${data.text}&route=15&DLTTemplateId=1207161596306313471`;
            const res = yield axios_1.default.post(url);
            console.log(res);
            return true;
        });
    }
}
exports.default = new SmsService;
