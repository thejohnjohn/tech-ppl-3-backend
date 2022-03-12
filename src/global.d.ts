import type mysql from 'mysql2/promise'

declare global {
    let connection: mysql.Connection
}
