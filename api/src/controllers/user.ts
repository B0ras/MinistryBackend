import { Response, Request } from 'express';
import { insert, remove, selectById, select_all, update } from '../services/db';
import User from "../models/user"

const table = "Users"

export async function selectUserId(req: Request, res: Response) {
    const { id } = req.params

    try {
        const user = await selectById(parseInt(id), table)
        return res.json({ msg: user });
    } catch (e) {
        console.log(e)
        return res.json({
            error: `Could not find user`
        }).status(500)
    }

}

export async function selectUser(req: Request, res: Response) {
    return res.json({ msg: await select_all(table) })
}

export async function insertUser(req: Request, res: Response) {
    const user = req.body
    if (!user) return res.json({
        error: "No user specified"
    }).status(401)
    try {
        await insert(user, table)
        return res.json({
            msg: "user created"
        }).status(201)
    } catch (e) {
        console.log(e)
        return res.json({
            error: "Could not insert user"
        }).status(500)
    }
}

export async function removeUser(req: Request, res: Response) {
    const { id } = req.params
    try {
        await remove(parseInt(id), table)
    } catch (e) {
        console.log(e)
        return res.json({
            error: "Could not remove user"
        }).status(500)
    }
    return res.status(200)
}

export async function updateUser(req: Request, res: Response) {
    const { id } = req.params
    const user: User = req.body
    try {
        const data = await update(parseInt(id), user, table)
        return res.json({ msg: data }).status(200)
    } catch (e) {
        console.log(e)
        return res.json({
            error: "Could not update user"
        }).status(500)
    }
}