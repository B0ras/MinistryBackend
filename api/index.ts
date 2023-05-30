import express from "express"
import helmet from "helmet"
import shiftRouter from './src/routes/shift';
import userRouter from './src/routes/user';

const app = express();
app.use(express.json())
app.use(helmet())

app.use("/shift", shiftRouter)
app.use("/user", userRouter)

app.get("/", (req, res) => {
    return res.json({
        hello: "hello"
    })
})


module.exports = app