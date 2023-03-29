import User from "../models/user-model"
import { InferCreationAttributes, InferAttributes } from 'sequelize';
import bcrypt from 'bcrypt';

class UserService{

    createUser = async (data:InferCreationAttributes<User>) => await User.create(data);

    findUser = async (filter:any) => await User.findOne({where:filter});

    updateUser = async (filter:any,data:any) => await User.update(data,{where:filter});

    verifyPassword =  (plane:string,hash:string) : boolean =>{
        const isPasswordMatched = bcrypt.compareSync(plane,hash)
        console.log({isPasswordMatched});
        return isPasswordMatched;
    }

}

export default new UserService