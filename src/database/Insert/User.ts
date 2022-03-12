
import getConnection from '../getConnection'
import errors from '../../errors'

/** Insert a new User */
export default async (params: {
    user_id: string
    gender: string
    age: number
}): Promise<number> => {
    const connection = await getConnection()

    const values: (string|number)[] = [
        params.user_id,
        params.gender,
        params.age,
    ]
    const query = `
        INSERT INTO my_database.users (user_id, gender, age) 
        VALUES (?,?,?)
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

    return rows[0].insertId
}
