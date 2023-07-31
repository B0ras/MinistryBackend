import { Router } from 'express';
import { signToShift, signOutOfShift } from '../controllers/sign';

const signRouterId = Router()

signRouterId.put("/", signToShift)
signRouterId.delete("/", signOutOfShift)

export default signRouterId