import { Response, Request } from 'express';
import { insert, remove, selectById, select_all, update } from '../services/db';
import User from "../models/user"
import { hashPass } from '../utils/bcrypt';

const table = "Users"

const params = "id,username,role:Roles!Users_role_fkey(name)"

export async function selectUserId(req: Request, res: Response) {
    const { id } = req.query

    try {
        const user = await selectById(parseInt(id as string), table, params)
        return res.json({ msg: user[0] });
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: `Could not find user`
        })
    }

}

export async function selectUser(req: Request, res: Response) {
    try {
        return res.json({ msg: await select_all(table, params) })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: "There was an error." })
    }
}

export async function insertUser(req: Request, res: Response) {
    const { username, password }: User = req.body
    if (!(username && password)) return res.json({
        error: "Missing username or password"
    }).status(401)
    const user: User = { username: username, password: await hashPass(password) }
    if (!user) return res.json({
        error: "No user specified"
    }).status(401)
    try {
        await insert(user, table)
        return res.status(201).json({
            msg: "user created"
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: "Could not insert user"
        })
    }
}

export async function removeUser(req: Request, res: Response) {
    const { id } = req.query
    try {
        await remove(parseInt(id as string), table)
    } catch (e) {
        console.log(e)
        return res.json({
            error: "Could not remove user"
        }).status(500)
    }
    return res.status(200)
}

// TODO: Fix updating just username or password
export async function updateUser(req: Request, res: Response) {
    const { id } = req.query
    const { username, password }: User = req.body
    if (!(username && password)) return res.json({
        error: "Missing username or password"
    }).status(401)
    const user: User = { username: username, password: await hashPass(password) }
    try {
        const data = await update(parseInt(id as string), user, table)
        return res.json({ msg: data }).status(200)
    } catch (e) {
        console.log(e)
        return res.json({
            error: "Could not update user"
        }).status(500)
    }
}