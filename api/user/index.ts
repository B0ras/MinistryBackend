import express from "express"
import { userRouter } from "../../src/routes/user"
import helmet from "helmet"
import {createApp} from "../../src/utils/createServer"

const app = createApp()

app.use("/api/user", userRouter)

module.exports = app