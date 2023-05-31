import { Response, Request } from 'express';
import { insert, remove, selectById, select_all, update } from '../services/db';
import Shift from "../models/shift"

const table = "Shifts"

export async function selectShiftId(req: Request, res: Response) {
    const { id } = req.query
    if (!id) return res.json({ error: "No id specified" })

    try {
        const shift = await selectById(parseInt(id as string), table, `id,day,duration,userA:Users!Shifts_personA_fkey(id,username),
        userB:Users!Shifts_personB_fkey(id,username),
        userC:Users!Shifts_personC_fkey(id,username)`)
        return res.json({ msg: shift });
    } catch (e) {
        console.log(e)
        return res.json({
            error: `Could not find shift`
        }).status(500)
    }

}

export async function selectShift(req: Request, res: Response) {
    try {
        return res.json({
            msg: await select_all(table, `id,day,duration,userA:Users!Shifts_personA_fkey(id,username),
        userB:Users!Shifts_personB_fkey(id,username),
        userC:Users!Shifts_personC_fkey(id,username)`)
        })
    } catch (e) {
        console.log(e)
        return res.json({ error: "Error returning shifts" })
    }
}

export async function insertShift(req: Request, res: Response) {
    const shift = req.body
    if (!shift) return res.json({
        error: "No shift specified"
    }).status(401)
    try {
        await insert(shift, table)
        return res.json({
            msg: "Shift created"
        }).status(201)
    } catch (e) {
        console.log(e)
        return res.json({
            error: "Could not insert shift"
        }).status(500)
    }
}

export async function removeShift(req: Request, res: Response) {
    const { id } = req.query
    try {
        await remove(parseInt(id as string), table)
    } catch (e) {
        console.log(e)
        return res.json({
            error: "Could not remove shift"
        }).status(500)
    }
    return res.status(200)
}

export async function updateShift(req: Request, res: Response) {
    const { id } = req.query
    const shift: Shift = req.body
    try {
        const data = await update(parseInt(id as string), shift, table)
        return res.json({ msg: data }).status(200)
    } catch (e) {
        console.log(e)
        return res.json({
            error: "Could not update shift"
        }).status(500)
    }
}