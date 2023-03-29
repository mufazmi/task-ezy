
import User from "../../models/user-model";
import config from "../config";
require('./db')

const isDev = config.APP_ENV === 'development'
console.log("config.APP_ENV === 'development'",config.APP_ENV === 'development')

const dbInit = () =>{
    User.sync({alter:isDev})
}

export default dbInit