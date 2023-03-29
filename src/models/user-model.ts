import { Model,InferAttributes,InferCreationAttributes,DataTypes,CreationOptional, Sequelize } from "sequelize";
import db from "../configs/db/db";

class User extends Model<InferAttributes<User>,InferCreationAttributes<User>>{

    declare id:CreationOptional<string>
    declare name: string
    declare password:string
    declare isPhoneVerified:boolean
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
        allowNull:true
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

export default User