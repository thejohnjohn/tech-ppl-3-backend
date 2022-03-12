import dotenv from 'dotenv'
import validateEnv from './functions/validateEnv'
dotenv.config()

// Add types to process.env
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            HOST?: string
            PORT?: string

            API_PASSWORD_HASH?: string
            DATABASE_CONNECTION_STRING?: string

            RATE_LIMIT_TIME?: string
            RATE_LIMIT_AMOUNT?: string

            CORS_ALLOWED_URLS?: string
        }
    }
}

// Add proper types to env variable
interface Env {
    HOST: string
    PORT: number

    API_PASSWORD_HASH: string
    DATABASE_CONNECTION_STRING: string

    RATE_LIMIT_TIME: number
    RATE_LIMIT_AMOUNT: number

    CORS_ALLOWED_URLS: string[] | string
}

// Validate process.env variables before exporting the env variable
validateEnv()

// Set up env variable
const env: Env = {
    HOST: process.env.HOST!,
    PORT: process.env.PORT ? Number(process.env.PORT) : 8080,

    API_PASSWORD_HASH: process.env.API_PASSWORD_HASH!,
    DATABASE_CONNECTION_STRING: process.env.DATABASE_CONNECTION_STRING!,

    RATE_LIMIT_TIME: process.env.RATE_LIMIT_TIME ? Number(process.env.RATE_LIMIT_TIME!) : 1000,
    RATE_LIMIT_AMOUNT: process.env.RATE_LIMIT_AMOUNT ? Number(process.env.RATE_LIMIT_AMOUNT!) : 10,

    CORS_ALLOWED_URLS: JSON.parse(process.env.CORS_ALLOWED_URLS!).length ? JSON.parse(process.env.CORS_ALLOWED_URLS!) : '*',
}
export default env
