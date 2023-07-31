import express from "express"
import helmet from "helmet"
import cors from "cors"
import cookieParser from "cookie-parser"

export function createApp() {
    const app = express()
    app.use(cookieParser())
    app.use(helmet())
    const url = process.env.CORS_URL
    if (process.env.VERCEL_ENV === "development")
        app.use(cors({ origin: url, credentials: true }))
    return app
}