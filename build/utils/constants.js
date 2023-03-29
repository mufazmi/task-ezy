"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Constants {
}
Constants.SERVER_MESSAGE = {
    NOT_FOUND: "Oops..! It's 404",
    FORBIDDEN: "Oops..! It's 403",
    BAD_REQUEST: "Bad Request",
    SERVER_ERROR: "Oops..! Something went wrong"
};
Constants.STATUS_CODE = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    BAD_REQUEST: 400,
    SERVER_ERROR: 500
};
Constants.OTP_TYPE = {
    MOBILE_VERIFICATION: 'mobile_verification',
    FORGOT_PASSWORD: 'forgot_password'
};
exports.default = Constants;
