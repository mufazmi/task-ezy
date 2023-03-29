import User from "../models/user-model"

class UserService{

    findUser = async (filter:any) => await User.findOne(filter);

}

export default new UserService