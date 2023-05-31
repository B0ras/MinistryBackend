import express from "express"
import { userRouter } from "../../src/routes/user"
import helmet from "helmet"

const app = express()
app.use(helmet())

app.use("/api/user", userRouter)

module.exports = app