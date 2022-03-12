import mysql from 'mysql2/promise'
import env from '../env'

/** Get Database connection.
 * Reconnects in case the previous connection drops
 */
const getConnection = async (): Promise<mysql.Connection> => {
    const globals = (globalThis as any)
    const connection: mysql.Connection = globals.connection

    // Check if a connection was already made
    if (connection) {
        // Check if connection is still working
        try {
            await connection.query('SELECT 1')
        } catch (exc) {
            console.log('Reconnecting to db')
            connection.destroy()
            // If not, reconnect
            return await connect()
        }
        // If it does, send the same connection
        return connection
    }
    console.log('Connecting to db')
    return await connect()
}

/** Create a new connection to the Database */
let connect = async (): Promise<mysql.Connection> => {
    const globals = (globalThis as any)

    const nCon = await mysql.createConnection(env.DATABASE_CONNECTION_STRING)
    globals.connection = nCon
    return nCon
}

export default getConnection
