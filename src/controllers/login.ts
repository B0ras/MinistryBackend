import { Request, Response } from 'express';
import { selectByUsername } from '../services/db';
import { comparePass } from "../utils/bcrypt";
import { genJWT } from "../utils/jwt";
import User from '../models/user';

const table = "Users"
export async function loginController(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        const { username2, password2 } = req.query;
        if (!(username && password)) return res.status(401).json({
            error: "Missing username or password"
        })
        const foundUser: User = await selectByUsername(username as string, table)
        if (foundUser) {
            if (await comparePass(password as string, foundUser.password)) {
                const { token, expiresIn } = genJWT(foundUser)
                const cookies = req.cookies
                return res
                    .cookie("SESSION", token, { maxAge: expiresIn + 100000000000, httpOnly: true })
                    .json({
                        jwt: token,
                        user: {
                            username: foundUser.username,
                            roles: [foundUser.role]
                        }
                    })
            }
        }
    } catch (e) {
        console.log(e)
    }
    return res.status(401).json({
        error: "Wrong username or password"
    })
}