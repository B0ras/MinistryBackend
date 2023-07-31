import express, { json } from "express"
import helmet from "helmet"
import cors from "cors"
import cookieParser from "cookie-parser"

export function createApp() {
    const app = express()
    app.use(cookieParser())
    app.use(helmet())
    app.use(json())
    const url = process.env.CORS_URL
    console.error(`CORS: ${url}`)
    app.use(cors({ origin: url, credentials: true }))
    return app
}