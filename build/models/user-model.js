"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../configs/db/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const otp_model_1 = __importDefault(require("./otp-model"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    mobile: {
        type: sequelize_1.DataTypes.STRING(13),
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false
    },
    isPhoneVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    sequelize: db_1.default
});
User.beforeCreate((user) => {
    const salt = bcrypt_1.default.genSaltSync(3, 'a');
    user.password = bcrypt_1.default.hashSync(user.password, salt);
});
User.hasMany(otp_model_1.default, { sourceKey: 'id', foreignKey: 'user_id', as: 'otps' });
exports.default = User;
