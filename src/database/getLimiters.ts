import type { Limiters } from './types'

/** Get Database limiters */
export default (limit?: number, offset?: number): Limiters => {
    return {
        limit: limit || 50,
        offset: offset || 0,
    }
}
