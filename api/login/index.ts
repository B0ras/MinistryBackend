import express from "express"
import helmet from "helmet"
import loginRouter from "../../src/routes/login"

const app = express();
app.use(helmet())

app.use("/api/login", loginRouter)

module.exports = app