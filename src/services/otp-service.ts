import crypto from 'crypto';
import { InferCreationAttributes } from 'sequelize';
import Otp from '../models/otp-model';

class OtpService {

    generateOtp = (): string => crypto.randomInt(100000, 999999).toString();

    createOtp = async (data:InferCreationAttributes<Otp>) => await Otp.create(data);

    findOtp = async (filter:any) => await Otp.findOne({where:filter});

}
export default new OtpService