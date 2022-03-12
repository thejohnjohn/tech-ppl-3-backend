import getConnection from '../../getConnection'
import errors from '../../../errors'
import type { User } from '../../../types'

/** Get User */
export default async (user_id: string): Promise<User|undefined> => {
    const connection = await getConnection()

    const values: string[] = [user_id]
    const query = `
        SELECT user_id, gender, age
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

    if (rows[0].length === 1) {
        const data = rows[0][0]
        const User: User = {
            user_id: data.user_id,
            gender: data.gender,
            age: data.age,
        }
        return User
    }
    if (!rows[0].length) {
        const err = Error(errors.data.NO_ROWS)
        err.name = errors.types.NOT_FOUND
        return Promise.reject(err)
    }

    return Promise.reject(Error(errors.data.TOO_MANY_ROWS))
}
