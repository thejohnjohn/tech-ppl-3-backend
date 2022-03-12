import getConnection from '../getConnection'
import errors from '../../errors'

/** Update age of User */
export default async (params: {
    age: number
    user_id: string
}): Promise<boolean> => {
    const connection = await getConnection()

    const values: (string|number)[] = [
        params.age,
        params.user_id,
    ]
    const query = `
        UPDATE my_database.users
        SET age = ?
        WHERE user_id = ?
    `

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
