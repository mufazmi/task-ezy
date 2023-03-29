import { Request, Response, NextFunction } from 'express';
import authValidation from '../validations/auth-validation';
import userService from '../services/user-service';
import ErrorHandler from '../utils/error-handler';
import Messages from '../utils/messages';
import responseSuccess from '../utils/response';
import otpService from '../services/otp-service';
import tokenService from '../services/token-service';
import UserDto from '../dtos/user-dto';
import Constants from '../utils/constants';

class AuthController {

    register = async (req: Request, res: Response, next: NextFunction) => {
        const body = await authValidation.register.validateAsync(req.body);
        const user = await userService.findUser({ mobile: body.mobile })
        if (user)
            return next(ErrorHandler.notFound(Messages.AUTH.ACCOUNT_ALREADY_REGISTERED))
        const register = await userService.createUser(body);
        const otp = otpService.generateOtp();
        // await otpService.createOtp({otp:otp,user_id:register});
        return register ? responseSuccess({ res, message: Messages.AUTH.ACCOUNT_CREATED }) : next(ErrorHandler.serverError());
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        const body = await authValidation.login.validateAsync(req.body);

        const user = await userService.findUser({ mobile: body.mobile })
        if (!user)
            return next(ErrorHandler.notFound(Messages.AUTH.ACCOUNT_NOT_FOUND))

        const isMatched: boolean = userService.verifyPassword(body.password, user.password);
        if (!isMatched)
            return next(ErrorHandler.forbidden(Messages.AUTH.INVALID_PASSWORD))

        const tokenPayload = {
            id: user.id,
            name: user.name,
            mobile: user.mobile,
            verified: false
        }

        const { accessToken, refreshToken } = tokenService.generateToken(tokenPayload);
        const response = {
            user: new UserDto(user),
            accessToken,
            refreshToken
        }

        return responseSuccess({ res, message: Messages.AUTH.LOGIN_SUCCESS, data: response })
    }

    verify = async (req: Request, res: Response, next: NextFunction) => {
        let isValidToken = false;
        const body = await authValidation.verify.validateAsync(req.body);

        const user = await userService.findUser({ mobile: body.mobile })
        if (!user)
            return next(ErrorHandler.notFound(Messages.AUTH.ACCOUNT_NOT_FOUND))

        const otp = await otpService.findOtp({ user_id: user.id, otp: body.otp, type: Constants.OTP_TYPE.MOBILE_VERIFICATION });
        if (!otp)
            return next(ErrorHandler.forbidden(Messages.AUTH.INVALID_OTP))

        if (!user.isPhoneVerified)
            await userService.updateUser({ mobile: user.mobile }, { isPhoneVerified: true });

        if (body.token) {
            const tokenUser = tokenService.verifyAccessToken(body.token);
            if (!tokenUser)
                return next(ErrorHandler.forbidden(Messages.AUTH.INVALID_ACCESS_TOKEN))
            isValidToken = true
        }

        if (isValidToken) {
            const tokenPayload = {
                id: user.id,
                name: user.name,
                mobile: user.mobile,
                verified: true
            }

            const { accessToken, refreshToken } = tokenService.generateToken(tokenPayload);
            const response = {
                user: new UserDto(user),
                accessToken,
                refreshToken
            }

            return responseSuccess({ res, message: Messages.AUTH.LOGIN_SUCCESS, data: response })
        }

        return responseSuccess({ res, message:Messages.AUTH.ACCOUNT_VERIFIED })

    }

}

export default new AuthController