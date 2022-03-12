import path from 'path'
import type { Request, Response } from 'express'
import Express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import env from './env'
import getConnection from './database/getConnection'

// Import routes
import v1 from './routes/v1'

// Connect to the database
getConnection()

// Create express app
const app = Express()

// Configure cors
app.use(cors({
    origin: env.CORS_ALLOWED_URLS,
}))

// Configure rate limiter
app.set('trust proxy', 1)
const limiter = rateLimit({
    windowMs: env.RATE_LIMIT_TIME,
    max: env.RATE_LIMIT_AMOUNT,
    message: JSON.stringify({ error: `Too many requests. Only ${env.RATE_LIMIT_AMOUNT} requests are allowed per ${env.RATE_LIMIT_TIME}ms.` }),
})
app.use(limiter)

// Configure static files
app.use('/public', Express.static(path.join(__dirname, 'public')))

// Log request and set default content-type
app.use((req: Request, res: Response, next) => {
    console.log(req.method, req.originalUrl)
    res.setHeader('content-type', 'text/json')

    next()
})

// Root route
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
        .send(Buffer.from(`
        <h1>Welcome to the Typescript API Template!</h1>
    `))
})

// Sub-routes
app.use('/v1', v1)

// Start server
const host = env.HOST
const port = env.PORT
app.listen(port, host, () => {
    console.log(`Listening on http://${host}:${port}`)
})
