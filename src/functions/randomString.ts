/**
 * Generate a random string with [a-zA-Z0-9] characters
 * @length Length of the string
 */
export default (length: number): string => {
    let result = ''
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i < length; i++)
        result += chars.charAt(Math.random() * chars.length)

    return result
}
