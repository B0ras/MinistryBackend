import { Request, Response } from 'express'
import { verifyJWT } from '../utils/jwt'
import { selectById, update } from "../services/db"
import User from '../models/user'
import Shift from "../models/shift"

const shiftsTable = "Shifts"

const userTable = "Users"

const params = `id,day,duration,userA:Users!Shifts_personA_fkey(id,username),
userB:Users!Shifts_personB_fkey(id,username),
userC:Users!Shifts_personC_fkey(id,username),place:Places!Shifts_place_fkey(id,place)`

export async function signController(req: Request, res: Response) {
    const { cookies } = req
    const { id } = req.query
    const token = cookies['SESSION']

    const userId = verifyJWT(token).sub

    if (!userId) return res.status(401).json({ error: "Unauthorized" })

    if (!id) return res.status(500).json({ error: "Id not specified" })

    try {
        const shift: Shift = await selectById<Shift>(parseInt(id as string), shiftsTable)

        const user: User = await selectById<User>(parseInt(userId as string), userTable)

        const { personA, personB, personC } = shift

        const arrayOfUndefinedPeople = [personA, personB, personC].map((person, index) => {
            if (!person) return index
        })


        if (arrayOfUndefinedPeople.length === 0) return res.status(500).json({ error: "No available space" })

        const assignedShift = assignToFreeShift(shift, user.id, arrayOfUndefinedPeople)

        const data = await update(parseInt(id as string), shift, shiftsTable, params)

        return res.status(200).json({ data: data })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "An error occurred" })
    }

}

function assignToFreeShift(shift: Shift, id: number | undefined, arrayOfUndefinedPeople: (number | undefined)[]) {
    // This function always assigns to first shift no matter the availability
    // TODO: Fix this
    let assigned = false
    arrayOfUndefinedPeople.forEach((item) => {
        if (assigned) return;
        switch (item) {
            case 1:
                shift.personA = id
                assigned = true
                break;
            case 2:
                shift.personB = id
                assigned = true
                break;
            case 3:
                shift.personC = id
                assigned = true
                break;
        }

    })
    return shift
}
