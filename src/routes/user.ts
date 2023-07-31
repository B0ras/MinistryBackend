import { Router } from 'express';
import { insertUser, removeUser, selectUser, selectUserId, updateUser } from "../controllers/user"
import { hasRole } from '../middleware/authorization';

export const userRouter = Router()
export const userRouterById = Router()

userRouter.get("/", hasRole([2]), selectUser)
userRouter.post("/", hasRole([2]), insertUser)
userRouterById.get("/", hasRole([2]), selectUserId)
userRouterById.put("/", hasRole([2]), updateUser)
userRouterById.delete("/", hasRole([2]), removeUser)
