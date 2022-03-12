import getConnection from '../../getConnection'
import type { Limiters } from '../../types'
import type { User } from '../../../types'
import errors from '../../../errors'

/** Get an array of User */
export default async (params: {
    filters: GetUserFilters
    ordering: GetUserOrdering
    limiters: Limiters
}): Promise<User[]> => {
    const connection = await getConnection()
    let query = `
        SELECT user_id, gender, age
        FROM my_database.users
    `

    const values: string[] = []
    let isFirst = true
    for (const [key, value] of Object.entries(params.filters)) {
        if (value) {
            if (!isFirst) {
                query += ' and'
            } else {
                query += ' WHERE'
                isFirst = false
            }
            query += ` ${key} = ?`
            values[values.length] = value
        }
    }

    if (params.ordering.order_by) {
        query += ` ORDER BY ${params.ordering.order_by}`

        switch (params.ordering.order_direction?.toLowerCase()) {
            case 'asc': {
                query += ' ASC'
                break
            }
            case 'desc': {
                query += ' DESC'
            }
        }
    }
    query += `LIMIT ${params.limiters.limit} OFFSET ${params.limiters.offset}`

    let rows: any
    try {
        rows = await connection.execute(query, values)
    } catch (err) {
        console.log('QUERY ERROR query:', query)
        console.log('QUERY ERROR values:', values)
        return Promise.reject(err)
    }

    let items: User[] = []
    for (const data of rows[0]) {
        const item: User = {
            user_id: data.user_id,
            gender: data.gender,
            age: data.age,
        }
        items = items.concat(item)
    }

    return items
}

export interface GetUserOrdering {
    order_by?: 'age'
    order_direction?: 'asc'|'desc'
}

export const getUserOrdering = (orderBy?: string, orderDirection?: 'asc' | 'desc'): GetUserOrdering|Error => {
    let order_by: 'age'|undefined
    if (orderBy === 'age') {
        order_by = orderBy
    } else {
        const err = Error(errors.queries.INVALID_ORDER_BY)
        err.name = errors.types.INVALID_REQUEST
        return err
    }

    return {
        order_by,
        order_direction: orderDirection,
    }
}

export interface GetUserFilters {
    gender?: 'male'|'female'
}

export const getUserFilters = (gender?: string): GetUserFilters|Error => {
    let nGender: 'male' | 'female' | undefined
    if (gender) {
        if (gender === 'male' || gender === 'female') {
            nGender = gender
        } else {
            const err = Error(errors.queries.INVALID_GENDER)
            err.name = errors.types.INVALID_REQUEST
            return err
        }
    }
    return {
        gender: nGender,
    }
}
