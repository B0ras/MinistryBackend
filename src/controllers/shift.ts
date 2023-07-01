import { Response, Request } from 'express';
import { insert, remove, selectById, select_all, update } from '../services/db';
import Shift from "../models/shift"

const table = "Shifts"

const params = `id,day,duration,userA:Users!Shifts_personA_fkey(id,username),
userB:Users!Shifts_personB_fkey(id,username),
userC:Users!Shifts_personC_fkey(id,username),place:Places!Shifts_place_fkey(id,place)`

export async function selectShiftId(req: Request, res: Response) {
    const { id } = req.query
    if (!id) return res.json({ error: "No id specified" })

    try {
        const shift = await selectById(parseInt(id as string), table, params)
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
            data: await select_all(table, params)
        })
    } catch (e) {
        console.log(e)
        return res.json({ error: "Error returning shifts" })
    }
}

export async function insertShift(req: Request, res: Response) {
    const shift = req.body
    if (!shift) return res.status(401).json({
        error: "No shift specified"
    })
    // console.log(`SHIFT: ${shift.shift.day}`)
    try {
        const data = await insert(shift, table)
        return res.status(201).json({
            msg: "Shift created",
            data: data

        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: "Could not insert shift"
        })
    }
}

export async function removeShift(req: Request, res: Response) {
    const { id } = req.query
    try {
        const data = await remove(parseInt(id as string), table) as Shift
        return res.status(200).json({
            id: data.id
        })
    } catch (e) {
        console.log(e)
        return res.json({
            error: "Could not remove shift"
        }).status(500)
    }
}

export async function updateShift(req: Request, res: Response) {
    const { id } = req.query
    const shift: Shift = req.body
    try {
        await update(parseInt(id as string), shift, table)
        const data = await selectById(parseInt(id as string), table, params)
        return res.json({ data: data }).status(200)
    } catch (e) {
        console.log(e)
        return res.json({
            error: "Could not update shift"
        }).status(500)
    }
}