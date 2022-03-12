import bcrypt from 'bcrypt'
import randomString from './randomString'

/** Generate an API password and the API_PASSWORD_HASH and log it to the console */
export default () => {
    const key = randomString(32)
    console.log('Generating a new API password')
    console.log(`API password (use this as a bearer token): ${key}`)
    console.log(`API_PASSWORD_HASH (use this in your .env file): ${bcrypt.hashSync(key, 10)}`)
}
