import { Router } from 'express';
import { insertUser, removeUser, selectUser, selectUserId, updateUser } from "../controllers/user"

export const userRouter = Router()
export const userRouterById = Router()

userRouter.get("/", selectUser)
userRouter.post("/", insertUser)
userRouterById.get("/", selectUserId)
userRouterById.put("/", updateUser)
userRouterById.delete("/", removeUser)
