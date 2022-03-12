import genAPIKey from './genAPIKey'

/**
 * Validate process.env variables and crash the app if they are invalid
 */
export default () => {
    const errors: string[] = []
    const msg = 'environment variable is invalid'

    // Strings
    if (!process.env.HOST)
        errors[errors.length] = `HOST ${msg}`

    if (!process.env.DATABASE_CONNECTION_STRING)
        errors[errors.length] = `DATABASE_CONNECTION_STRING ${msg}`

    if (!process.env.API_PASSWORD_HASH) {
        console.log('API_PASSWORD_HASH is undefined')
        genAPIKey()
        errors[errors.length] = `API_PASSWORD_HASH ${msg}`
    }

    if (!process.env.CORS_ALLOWED_URLS) {
        errors[errors.length] = `CORS_ALLOWED_URLS ${msg}`
    } else {
        try {
            JSON.parse(process.env.CORS_ALLOWED_URLS)
        } catch (exc) {
            errors[errors.length] = `CORS_ALLOWED_URLS ${msg}`
        }
    }

    // Numbers
    if (isNaN(Number(process.env.PORT)))
        errors[errors.length] = `PORT ${msg}`

    if (isNaN(Number(process.env.RATE_LIMIT_TIME)))
        errors[errors.length] = `RATE_LIMIT_TIME ${msg}`

    if (isNaN(Number(process.env.RATE_LIMIT_AMOUNT)))
        errors[errors.length] = `RATE_LIMIT_AMOUNT ${msg}`

    if (errors.length) {
        errors.map(err => console.log(err))
        process.exit(-1)
    }
}
