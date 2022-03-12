import getConnection from '../getConnection'
import errors from '../../errors'

/** Delete User */
export default async (user_id: string) => {
    const connection = await getConnection()

    const values: string[] = [user_id]
    const query = `
        DELETE
        FROM my_database.users
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
}
