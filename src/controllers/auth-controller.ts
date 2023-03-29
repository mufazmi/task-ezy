import {Request, Response, NextFunction} from 'express';
import authValidation from '../validations/auth-validation';
import userService from '../services/user-service';
import ErrorHandler from '../utils/error-handler';
import Messages from '../utils/messages';
import responseSuccess from '../utils/response';
import otpService from '../services/otp-service';

class AuthController{

    register = async (req:Request,res:Response,next:NextFunction) =>{
        const body = await authValidation.register.validateAsync(req.body);
        const user = await userService.findUser({mobile:body.mobile})
        if(user)
            return next(ErrorHandler.notFound(Messages.USER.USER_ALREADY_REGISTERED))
        const register = await userService.createUser(body);
        const otp = otpService.generateOtp();
        await otpService.createOtp({otp:otp,userId:register});
        return register ? responseSuccess({res,message:Messages.USER.USER_CREATED}) : next(ErrorHandler.serverError());
    }

    login = async (req:Request, res:Response, next:NextFunction) =>{
        const body = await authValidation.login.validateAsync(req.body);
        
        const user = await userService.findUser({mobile:body.mobile})
        if(!user)
            return next(ErrorHandler.notFound(Messages.USER.USER_NOT_FOUND))
    }

}

export default new AuthController