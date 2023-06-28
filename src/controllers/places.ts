import { Request, Response } from "express"
import { select_all } from '../services/db'

const table = "Places"

export async function placesController(req: Request, res: Response) {
    try {
        return res.json({ data: await select_all(table) })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: "Error returning places" })
    }
}