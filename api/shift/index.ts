import express from "express"
import { shiftRouter } from '../../src/routes/shift';
import helmet from "helmet"

const app = express()
app.use(helmet())

const router = express.Router()

app.use("/api/shift", shiftRouter)
// app.use("/shift", shiftRouter)

module.exports = app