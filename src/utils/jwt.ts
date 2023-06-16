import User from '../models/user';
import { sign } from 'jsonwebtoken';

const secret = process.env.JWT_KEY || "secret"
export const duration = 3600000 //1h
export function genJWT(user: User) {
    return {
        token: sign({ sub: user.id }, secret, {
            expiresIn: duration
        }), expiresIn: duration
    }
}