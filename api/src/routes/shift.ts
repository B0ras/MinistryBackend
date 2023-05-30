import { Router } from 'express';
import { insertShift, removeShift, selectShift, selectShiftId, updateShift } from "../controllers/shift"

const shiftRouter = Router()

shiftRouter.get("/", selectShift)
shiftRouter.get("/:id", selectShiftId)
shiftRouter.post("/", insertShift)
shiftRouter.put("/:id", updateShift)
shiftRouter.delete("/:id", removeShift)

export default shiftRouter