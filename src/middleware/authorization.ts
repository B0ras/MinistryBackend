import { NextFunction, Request, Response } from "express"
import { verifyJWT } from '../utils/jwt'
import { selectById } from '../services/db'
import User from '../models/user'


const table = "Users"

export function hasRole(role: number[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies["SESSION"]

        if (!token) return res.status(401).json({ error: "No token found" })

        const jwtPayload = verifyJWT(token).sub

        const userId = parseInt(jwtPayload as string)

        const user: User = await selectById<User>(userId, table)

        if (!user.role) return res.status(401).json({ error: "Unauthorized" })

        if (role.includes(user.role)) return next()

        return res.status(401).json({ error: "Unauthorized" })

    }
}