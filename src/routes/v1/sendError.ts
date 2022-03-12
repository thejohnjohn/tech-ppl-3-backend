import type { Request, Response } from 'express'
import errors from '../../errors'

/** Send an error response to a request */
export default (req: Request, res: Response, err: Error, timer: number) => {
    let status = 500
    switch (err.name) {
        case errors.types.INVALID_REQUEST: {
            status = 400
            console.log(`ERROR 400: ${err}`)
            res.status(400).send({ error: err.message })
            break
        }
        case errors.types.UNAUTHORIZED: {
            status = 401
            console.log(`ERROR 401: ${err}`)
            res.status(401).send({ error: err.message })
            break
        }
        case errors.types.NOT_FOUND: {
            status = 404
            console.log(`ERROR 404: ${err}`)
            res.status(404).send({ error: err.message })
            break
        }
        default: {
            status = 500
            console.log('ERROR 500:')
            console.error(err)
            res.status(500).send({ error: err.message })
            break
        }
    }
    console.log(`${req.method} ${req.originalUrl} sent status ${status} in ${(Date.now() - timer) / 1000}s`)
}
