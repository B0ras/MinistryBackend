import { Request, Response } from 'express';
import { selectByUsername } from '../services/db';
import { comparePass } from "../utils/bcrypt";
import { genJWT } from "../utils/jwt";

const table = "Users"
export async function loginController(req: Request, res: Response) {
    try {
        const { username, password } = req.query;
        if (!(username && password)) return res.json({
            error: "Missing username or password"
        }).status(401)
        const foundUser = await selectByUsername(username as string, table)
        if (foundUser) {
            if (await comparePass(password as string, foundUser.password)) {
                console.log("PASSWORD IS CORRECT")
                return res.json({
                    jwt: genJWT(foundUser)
                })
            }
        }
    } catch (e) {
        console.log(e)
    }
    return res.json({
        error: "Wrong username or password"
    }).status(401)
}