import jwt from "jsonwebtoken";

const accessKey: string = process.env.ACCESS_KEY || '';
const refreshKey: string = process.env.REFRESH_KEY || '';

interface iGenerateToken {
    accessToken:string,
    refreshToken:string,
}

class TokenService {

    generateToken = (payload: any) : iGenerateToken=> {

        const accessToken = jwt.sign(payload, accessKey, {
            expiresIn: '1y' // For Testing
        })

        const refreshToken = jwt.sign(payload, refreshKey, {
            expiresIn: '1y'
        })

        return { accessToken, refreshToken }
    }

    verifyAccessToken = (token: string): {} => jwt.verify(token, accessKey);

    verifyRefreshToken = (token: string): {} => jwt.verify(token, refreshKey);

}

export default new TokenService