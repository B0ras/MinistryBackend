import { Router } from 'express';
import { insertShift, removeShift, selectShift, selectShiftId, updateShift } from "../controllers/shift"
import { hasRole } from '../middleware/authorization';

export const shiftRouter = Router()
export const shiftRouterId = Router()

shiftRouter.get("/", hasRole([1, 2]), selectShift)
shiftRouter.post("/", hasRole([2]), insertShift)
shiftRouterId.get("/", hasRole([1, 2]), selectShiftId)
shiftRouterId.put("/", hasRole([2]), updateShift)
shiftRouterId.delete("/", hasRole([2]), removeShift)
