import errors from '../../errors'
import type { RouteQueries } from './types'

/**
 * Verify and give types to req.query
 */
export default (queries: any): RouteQueries|Error => {
    // Limiters
    let limit: number|undefined
    const qLimit = Number(queries.limiters)
    if (qLimit) {
        if (typeof qLimit === 'number' && qLimit >= 0) {
            limit = qLimit
        } else {
            const err = Error(errors.queries.INVALID_LIMIT)
            err.name = errors.types.INVALID_REQUEST
            return err
        }
    }

    let offset: number|undefined
    const qOffset = Number(queries.offset)
    if (qOffset) {
        if (typeof qOffset === 'number' && qOffset >= 0) {
            offset = qOffset
        } else {
            const err = Error(errors.queries.INVALID_OFFSET)
            err.name = errors.types.INVALID_REQUEST
            return err
        }
    }

    // Ordering
    let order_by: string|undefined
    if (queries.order_by) {
        if (typeof queries.order_by === 'string') {
            order_by = queries.order_by
        } else {
            const err = Error(errors.queries.INVALID_ORDER_BY)
            err.name = errors.types.INVALID_REQUEST
            return err
        }
    }

    let order_direction: 'asc'|'desc'|undefined
    if (queries.order_direction) {
        if (queries.order_direction === 'asc' || queries.order_direction === 'desc') {
            order_direction = queries.order_direction
        } else {
            const err = Error(errors.queries.INVALID_ORDER_DIRECTION)
            err.name = errors.types.INVALID_REQUEST
            return err
        }
    }

    // User
    let user_id: string|undefined
    if (queries.user_id) {
        if (typeof queries.user_id === 'string') {
            user_id = queries.user_id
        } else {
            const err = Error(errors.queries.INVALID_USER_ID)
            err.name = errors.types.INVALID_REQUEST
            return err
        }
    }

    return {
        user_id,

        limit,
        offset,

        order_by,
        order_direction,
    }
}
