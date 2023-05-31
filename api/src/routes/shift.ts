import { Router } from 'express';
import { insertShift, removeShift, selectShift, selectShiftId, updateShift } from "../controllers/shift"

export const shiftRouter = Router()
export const shiftRouterId = Router()

shiftRouter.get("/", selectShift)
shiftRouter.post("/", insertShift)
shiftRouterId.get("/", selectShiftId)
shiftRouterId.put("/", updateShift)
shiftRouterId.delete("/", removeShift)
