import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { Router } from 'express'
import bodyParser from 'body-parser'
import errors from '../../errors'
import env from '../../env'
import sendError from './sendError'

// v1 route

// Import sub-routes
import user from './user'
import users from './users'

// Create router
const route = Router()

// Configure bodyParser to get route bodies
route.use(bodyParser.json())

// Check if API password is correct
route.use((req: Request, res: Response, next) => {
    res.setHeader('content-type', 'text/json')
    const pass = req.headers.authorization?.slice(7)
    if (bcrypt.compareSync(pass || '', env.API_PASSWORD_HASH)) {
        next()
    } else {
        const err = Error('Unauthorized')
        err.name = errors.types.UNAUTHORIZED
        return sendError(req, res, err, Date.now())
    }
})

// v1 root route
route.get('/', (req: Request, res: Response) => {
    const timer = Date.now()
    const msg = 'Welcome to the ts-api-template API!'

    console.log(`${req.method} ${req.originalUrl} sent a response in ${(Date.now() - timer) / 1000}s`)
    res.setHeader('Content-Type', 'text/json').send(`"Typescript template API v1.0.0: ${msg}"`)
})

// Configure sub-routes
route.use('/user', user)
route.use('/users', users)

export default route
