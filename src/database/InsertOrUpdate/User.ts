import getConnection from '../getConnection'
import errors from '../../errors'

interface Update {
    Column: string
    Value: string | number | null
}

/** Insert a new User or update if it already exists */
export default async (params: {
    user_id: string
    gender: string
    age: number
}): Promise<boolean> => {
    const connection = await getConnection()

    let query = `
        INSERT INTO my_database.users (
    `

    let values: (string|number|null)[] = []
    let updates: Update[] = []
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
            const c = key
            query += ` ${c},`
            values[values.length] = value
            updates = updates.concat({
                Column: c,
                Value: value,
            })
        }
    }

    query = query.slice(0, query.length - 1)
    for (let i = 0; i < values.length; i++) {
        if (i === 0) query += ') VALUES ('
        if (i === values.length - 1) query += '?)'
        else query += '?,'
    }

    let isFirst = true
    for (const update of updates) {
        if (!isFirst) {
            query += ' ,'
        } else {
            query += ' ON DUPLICATE KEY UPDATE'
            isFirst = false
        }
        query += ` ${update.Column} = ?`
        values = values.concat(update.Value)
    }

    let rows: any
    try {
        rows = await connection.execute(query, values)
    } catch (err) {
        console.log('QUERY ERROR query:', query)
        console.log('QUERY ERROR values:', values)
        return Promise.reject(err)
    }

    if (!rows[0].affectedRows) {
        const err = Error(errors.data.NO_ROWS_AFFECTED)
        err.name = errors.types.NOT_FOUND
        return Promise.reject(err)
    }

    return true
}
