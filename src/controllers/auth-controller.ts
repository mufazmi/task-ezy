import {Request, Response, NextFunction} from 'express';
import authValidation from '../validations/auth-validation';
import userService from '../services/user-service';
import ErrorHandler from '../utils/error-handler';
import Messages from '../utils/messages';

class AuthController{

    register = async (req:Request,res:Response,next:NextFunction) =>{
        const body = await authValidation.register.validateAsync(req.body);
        const user = await userService.findUser({mobile:body.mobile})
        if(!user)
            return next(ErrorHandler.notFound(Messages.USER.USER_NOT_FOUND))

        
    }

}

export default new AuthController