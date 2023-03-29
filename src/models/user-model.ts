import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, Sequelize, HasManyAddAssociationMixin, HasManySetAssociationsMixin } from 'sequelize';
import db from "../configs/db/db";
import bcrypt from 'bcrypt';
import Otp from './otp-model';

class User extends Model<InferAttributes<User>,InferCreationAttributes<User>>{

    declare id:CreationOptional<string>
    declare name: string
    declare mobile: string
    declare password:string
    declare isPhoneVerified:boolean
    declare createOtp: HasManyAddAssociationMixin<Otp, 'user_id'>;
    declare setUser: HasManySetAssociationsMixin<Otp, string>;
}

User.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false,
    },
    name:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    mobile:{
        type:DataTypes.STRING(13),
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING(200),
        allowNull:false
    },
    isPhoneVerified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    }
},{
    tableName:'users',
    timestamps:true,
    underscored:true,
    freezeTableName:true,
    sequelize:db
});

User.beforeCreate((user)=>{
    const salt = bcrypt.genSaltSync(3,'a');
    user.password = bcrypt.hashSync(user.password,salt);
})


User.hasMany(Otp,{sourceKey:'id',foreignKey:'user_id',as:'otps'});

export default User