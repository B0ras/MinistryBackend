import express from "express"
import { shiftRouterId } from '../../src/routes/shift';
import helmet from "helmet"
import {createApp} from "../../src/utils/createServer"

const app = createApp()
app.use("/api/shift/:id", shiftRouterId)

module.exports = app