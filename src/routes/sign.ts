import { Router } from 'express';
import { signController } from '../controllers/sign';

const signRouterId = Router()

signRouterId.put("/", signController)

export default signRouterId