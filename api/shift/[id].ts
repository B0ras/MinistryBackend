import express from "express"
import { shiftRouterId } from '../../src/routes/shift';
import helmet from "helmet"

const app = express()
app.use(helmet())
app.use("/api/shift/:id", shiftRouterId)
// app.use("/shift", shiftRouter)

module.exports = app