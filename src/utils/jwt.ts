import User from '../models/user';
import { sign } from 'jsonwebtoken';

const secret = process.env.JWT_KEY || "secret"
export function genJWT(user: User) {
    return sign({ sub: user.id }, secret, {
        expiresIn: "1h"
    })
}