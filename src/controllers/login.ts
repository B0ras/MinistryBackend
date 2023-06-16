import { Request, Response } from 'express';
import { selectByUsername } from '../services/db';
import { comparePass } from "../utils/bcrypt";
import { genJWT } from "../utils/jwt";

const table = "Users"
export async function loginController(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        if (!(username && password)) return res.status(401).json({
            error: "Missing username or password"
        })
        const foundUser = await selectByUsername(username as string, table)
        if (foundUser) {
            if (await comparePass(password as string, foundUser.password)) {
                const { token, expiresIn } = genJWT(foundUser)
                return res
                .cookie("SESSION", token, { maxAge: expiresIn, httpOnly: true })
                .json({
                    jwt: token
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