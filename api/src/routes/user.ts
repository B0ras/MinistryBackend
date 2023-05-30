import { Router } from 'express';
import { insertUser, removeUser, selectUser, selectUserId, updateUser } from "../controllers/user"

const userRouter = Router()

userRouter.get("/", selectUser)
userRouter.get("/:id", selectUserId)
userRouter.post("/", insertUser)
userRouter.put("/:id", updateUser)
userRouter.delete("/:id", removeUser)

export default userRouter