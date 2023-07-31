import { Router } from 'express';
import { signToShift, signOutOfShift } from '../controllers/sign';
import { hasRole } from '../middleware/authorization';

const signRouterId = Router()

signRouterId.put("/", hasRole([1, 2]), signToShift)
signRouterId.delete("/", hasRole([1, 2]), signOutOfShift)

export default signRouterId