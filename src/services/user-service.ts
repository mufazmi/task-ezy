import User from "../models/user-model"
import { InferCreationAttributes } from 'sequelize';

class UserService{

    createUser = async (data:InferCreationAttributes<User>) => await User.create(data);

    findUser = async (filter:any) => await User.findOne({where:filter});

}

export default new UserService