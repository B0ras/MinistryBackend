import { Response, Request } from 'express';
import { insert, remove, selectById, select_all, update } from '../services/db';
import Shift from "../models/shift"

const table = "Shifts"

export async function selectShiftId(req: Request, res: Response) {
    const { id } = req.params

    try {
        const shift = await selectById(parseInt(id), table)
        return res.json({ msg: shift });
    } catch (e) {
        console.log(e)
        return res.json({
            error: `Could not find shift`
        }).status(500)
    }

}

export async function selectShift(req: Request, res: Response) {
    return res.json({ msg: await select_all(table) })
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
    const { id } = req.params
    try {
        await remove(parseInt(id), table)
    } catch (e) {
        console.log(e)
        return res.json({
            error: "Could not remove shift"
        }).status(500)
    }
    return res.status(200)
}

export async function updateShift(req: Request, res: Response) {
    const { id } = req.params
    const shift: Shift = req.body
    try {
        const data = await update(parseInt(id), shift, table)
        return res.json({ msg: data }).status(200)
    } catch (e) {
        console.log(e)
        return res.json({
            error: "Could not update shift"
        }).status(500)
    }
}