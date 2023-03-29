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
const auth_validation_1 = __importDefault(require("../validations/auth-validation"));
const user_service_1 = __importDefault(require("../services/user-service"));
const error_handler_1 = __importDefault(require("../utils/error-handler"));
const messages_1 = __importDefault(require("../utils/messages"));
const response_1 = __importDefault(require("../utils/response"));
const otp_service_1 = __importDefault(require("../services/otp-service"));
const token_service_1 = __importDefault(require("../services/token-service"));
const user_dto_1 = __importDefault(require("../dtos/user-dto"));
const constants_1 = __importDefault(require("../utils/constants"));
const sms_service_1 = __importDefault(require("../services/sms-service"));
class AuthController {
    constructor() {
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const body = yield auth_validation_1.default.register.validateAsync(req.body);
            const user = yield user_service_1.default.findUser({ mobile: body.mobile });
            if (user)
                return next(error_handler_1.default.notFound(messages_1.default.AUTH.ACCOUNT_ALREADY_REGISTERED));
            const register = yield user_service_1.default.createUser(body);
            const otp = otp_service_1.default.generateOtp();
            const otpRes = yield otp_service_1.default.createOtp({ otp: '34234' });
            otpRes.setUser(register.id);
            yield sms_service_1.default.sendOtp({ mobile: body.mobile, otp: otp });
            return register ? (0, response_1.default)({ res, message: messages_1.default.AUTH.ACCOUNT_CREATED }) : next(error_handler_1.default.serverError());
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const body = yield auth_validation_1.default.login.validateAsync(req.body);
            const user = yield user_service_1.default.findUser({ mobile: body.mobile });
            if (!user)
                return next(error_handler_1.default.notFound(messages_1.default.AUTH.ACCOUNT_NOT_FOUND));
            const isMatched = user_service_1.default.verifyPassword(body.password, user.password);
            if (!isMatched)
                return next(error_handler_1.default.forbidden(messages_1.default.AUTH.INVALID_PASSWORD));
            const tokenPayload = {
                id: user.id,
                name: user.name,
                mobile: user.mobile,
                verified: false
            };
            const { accessToken, refreshToken } = token_service_1.default.generateToken(tokenPayload);
            const response = {
                user: new user_dto_1.default(user),
                accessToken,
                refreshToken
            };
            return (0, response_1.default)({ res, message: messages_1.default.AUTH.LOGIN_SUCCESS, data: response });
        });
        this.verify = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let isValidToken = false;
            const body = yield auth_validation_1.default.verify.validateAsync(req.body);
            const user = yield user_service_1.default.findUser({ mobile: body.mobile });
            if (!user)
                return next(error_handler_1.default.notFound(messages_1.default.AUTH.ACCOUNT_NOT_FOUND));
            const otp = yield otp_service_1.default.findOtp({ user_id: user.id, otp: body.otp, type: constants_1.default.OTP_TYPE.MOBILE_VERIFICATION });
            if (!otp)
                return next(error_handler_1.default.forbidden(messages_1.default.AUTH.INVALID_OTP));
            //  => otp expired validation
            if (!user.isPhoneVerified)
                yield user_service_1.default.updateUser({ mobile: user.mobile }, { isPhoneVerified: true });
            if (body.token) {
                const tokenUser = token_service_1.default.verifyAccessToken(body.token);
                if (!tokenUser)
                    return next(error_handler_1.default.forbidden(messages_1.default.AUTH.INVALID_ACCESS_TOKEN));
                isValidToken = true;
            }
            if (isValidToken) {
                const tokenPayload = {
                    id: user.id,
                    name: user.name,
                    mobile: user.mobile,
                    verified: true
                };
                const { accessToken, refreshToken } = token_service_1.default.generateToken(tokenPayload);
                const response = {
                    user: new user_dto_1.default(user),
                    accessToken,
                    refreshToken
                };
                return (0, response_1.default)({ res, message: messages_1.default.AUTH.LOGIN_SUCCESS, data: response });
            }
            return (0, response_1.default)({ res, message: messages_1.default.AUTH.ACCOUNT_VERIFIED });
        });
    }
}
exports.default = new AuthController;
