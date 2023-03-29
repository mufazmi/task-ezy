import Joi from 'joi'

class AuthValidation {

    register = Joi.object({
        name:Joi.string().min(3).max(100).required(),
        mobile : Joi.string().min(10).required(),
        password: Joi.string().min(8).max(50).required()
    });

}

export default new AuthValidation