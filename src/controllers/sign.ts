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

    const userIdAsString = verifyJWT(token).sub

    if (!userIdAsString) return res.status(401).json({ error: "Unauthorized" })

    const userId = parseInt(userIdAsString as string)

    if (!id) return res.status(500).json({ error: "Id not specified" })

    try {
        const shift: Shift = await selectById<Shift>(parseInt(id as string), shiftsTable)

        // const user: User = await selectById<User>(userId, userTable)

        // const arrayOfUndefinedPeople = [personA, personB, personC].map((person, index) => {
        //     if (!person) return index
        // })



        const { personA, personB, personC } = shift
        const people = [personA, personB, personC]



        if (isThereFreeShift(people)) return res.status(500).json({ error: "No available shift" })


        const newPeopleAsObjects = assignToFreeShift(people, userId)

        const newShift = { ...shift, ...newPeopleAsObjects }

        const data = await update(parseInt(id as string), newShift, shiftsTable, params)

        return res.status(200).json({ data: data })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "An error occurred" })
    }

}

function assignToFreeShift(people: (number | undefined)[], assignee: number) {
    let assigned = false;

    people = people.map((person) => {
        if (assigned) return person;
        if (!person) {
            person = assignee
            assigned = true
        }
        return person
    })

    const [personA, personB, personC] = people


    return { personA: personA, personB: personB, personC: personC }
}

function isThereFreeShift(people: (number | undefined)[]) {
    let isFreeShift = true

    let numberOfFreeShifts = 0
    people.forEach((person) => {
        if (!person) numberOfFreeShifts++;
    })

    if (numberOfFreeShifts !== 0) isFreeShift = false

    return isFreeShift;
}
