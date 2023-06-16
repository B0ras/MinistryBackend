import express from "express"
import helmet from "helmet"
import loginRouter from "../../src/routes/login"
import cors from "cors"
import cookieParser from "cookie-parser"
import {createApp} from "../../src/utils/createServer"

const app = createApp()

app.use("/api/login", loginRouter)

module.exports = app