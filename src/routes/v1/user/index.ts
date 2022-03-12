import type { Request, Response } from 'express'
import { Router } from 'express'
import sendError from '../sendError'
import errors from '../../../errors'
import getRouteBody from '../getRouteBody'
import getRouteQueries from '../getRouteQueries'
import { v1_DELETE_user, v1_GET_user, v1_PUT_user_insert } from './controllers'

const route = Router()

route.get('/', async (req: Request, res: Response) => {
    const timer = Date.now()

    const params = getRouteQueries(req.query)
    if (params instanceof Error) return sendError(req, res, params, timer)
    if (!params.user_id) {
        const err = Error(errors.queries.INVALID_USER_ID)
        err.name = errors.types.INVALID_REQUEST
        return sendError(req, res, err, timer)
    }

    const user = await v1_GET_user(params.user_id).catch((err: Error) => err)
    if (user instanceof Error) return sendError(req, res, user, timer)

    console.log(`${req.method} ${req.originalUrl} sent a response in ${(Date.now() - timer) / 1000}s`)
    return res.send(user)
})

route.put('/', async (req: Request, res: Response) => {
    const timer = Date.now()

    const body = getRouteBody(req.body)
    if (body instanceof Error) return sendError(req, res, body, timer)
    if (!body.user_id) {
        const err = Error(errors.queries.INVALID_USER_ID)
        err.name = errors.types.INVALID_REQUEST
        return sendError(req, res, err, timer)
    }
    if (!body.gender) {
        const err = Error(errors.queries.INVALID_USER_ID)
        err.name = errors.types.INVALID_REQUEST
        return sendError(req, res, err, timer)
    }
    if (!body.age) {
        const err = Error(errors.queries.INVALID_USER_ID)
        err.name = errors.types.INVALID_REQUEST
        return sendError(req, res, err, timer)
    }

    const user = await v1_PUT_user_insert({
        user_id: body.user_id,
        gender: body.gender,
        age: body.age,
    }).catch((err: Error) => err)
    if (user instanceof Error) return sendError(req, res, user, timer)

    console.log(`${req.method} ${req.originalUrl} sent a response in ${(Date.now() - timer) / 1000}s`)
    return res.send(user)
})

route.delete('/', async (req: Request, res: Response) => {
    // Timer for performance checking
    const timer = Date.now()

    // Get typed queries
    const params = getRouteQueries(req.query)
    if (params instanceof Error) return sendError(req, res, params, timer)
    if (!params.user_id) {
        const err = Error(errors.queries.INVALID_USER_ID)
        err.name = errors.types.INVALID_REQUEST
        return sendError(req, res, err, timer)
    }

    // Call route controller
    const user = await v1_DELETE_user(params.user_id).catch((err: Error) => err)
    if (user instanceof Error) return sendError(req, res, user, timer)

    console.log(`${req.method} ${req.originalUrl} sent a response in ${(Date.now() - timer) / 1000}s`)
    return res.send(user)
})

export default route
