import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey, CreationOptional } from 'sequelize';
import db from "../configs/db/db";
import Constants from '../utils/constants';
import User from './user-model';

class Otp extends Model<InferAttributes<Otp>,InferCreationAttributes<Otp>> {
    declare id:CreationOptional<string>
    declare otp:string
    declare type:string
    declare userId: ForeignKey<User['id']>
}
console.log(Constants)

Otp.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    otp:{
        type:DataTypes.STRING(6),
        allowNull:false
    },
    type:{
        type:DataTypes.ENUM,
        values:[Constants.OTP_TYPE.MOBILE_VERIFICATION, Constants.OTP_TYPE.FORGOT_PASSWORD],
        defaultValue:[Constants.OTP_TYPE.MOBILE_VERIFICATION]
    }
},{
    tableName:'otps',
    underscored:true,
    freezeTableName:true,
    timestamps:true,
    sequelize:db
});

export default Otp