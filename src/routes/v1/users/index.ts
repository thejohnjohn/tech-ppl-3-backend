import type { Request, Response } from 'express'
import { Router } from 'express'
import sendError from '../sendError'
import getRouteQueries from '../getRouteQueries'
import { v1_GET_users } from './controllers'

const route = Router()

route.get('/', async (req: Request, res: Response) => {
    // Timer for performance checking
    const timer = Date.now()

    // Get typed queries
    const params = getRouteQueries(req.query)
    if (params instanceof Error) return sendError(req, res, params, timer)

    // Call route controller
    const users = await v1_GET_users(params).catch((err: Error) => err)
    if (users instanceof Error) return sendError(req, res, users, timer)

    console.log(`${req.method} ${req.originalUrl} sent a response in ${(Date.now() - timer) / 1000}s`)
    return res.send(users)
})

export default route
