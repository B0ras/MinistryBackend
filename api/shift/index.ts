import express from "express"
import { shiftRouter } from '../../src/routes/shift';
import helmet from "helmet"
import {createApp} from "../../src/utils/createServer"

const app = createApp()

const router = express.Router()

app.use("/api/shift", shiftRouter)
// app.use("/shift", shiftRouter)

module.exports = app