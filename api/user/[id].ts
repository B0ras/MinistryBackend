import express from "express"
import { userRouterById } from "../../src/routes/user"
import helmet from "helmet"
import {createApp} from "../../src/utils/createServer"

const app = createApp()

app.use("/api/user/:id", userRouterById)

module.exports = app