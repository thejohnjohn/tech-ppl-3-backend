import Database from '../../../database'
import { getUserFilters, getUserOrdering } from '../../../database/Get/Users/All'
import getLimiters from '../../../database/getLimiters'
import type { RouteQueries } from '../types'

/**
 * GET v1/users controller
 */
export const v1_GET_users = async (params: RouteQueries) => {
    // Get Database limiters
    const limiters = getLimiters(params.limit, params.offset)
    if (limiters instanceof Error) return Promise.reject(limiters)

    // Get User filters
    const filters = getUserFilters(params.gender)
    if (filters instanceof Error) return Promise.reject(filters)

    // Get User ordering
    const ordering = getUserOrdering(params.order_by, params.order_direction)
    if (ordering instanceof Error) return Promise.reject(ordering)

    // Get Users
    const user = await Database.Get.Users.All({
        filters,
        ordering,
        limiters,
    }).catch((err: Error) => err)
    if (user instanceof Error) return Promise.reject(user)

    return (user)
}
