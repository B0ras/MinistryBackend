import express from "express"
import { userRouterById } from "../../src/routes/user"
import helmet from "helmet"

const app = express()
app.use(helmet())

app.use("/api/user/:id", userRouterById)

module.exports = app