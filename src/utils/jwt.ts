import User from '../models/user';
import { sign, verify } from 'jsonwebtoken';

const secret = process.env.JWT_KEY || "secret"
export const duration = 3600000 //1h
export function genJWT(user: User) {
    return {
        token: sign({ sub: user.id }, secret, {
            expiresIn: duration
        }), expiresIn: duration
    }
}

export function verifyJWT(token: string) {
    return verify(token, secret)
}