import Database from '../../../database'

/**
 * GET v1/user controller
 */
export const v1_GET_user = async (user_id: string) => {
    const user = await Database.Get.Users.Single(user_id).catch((err: Error) => err)
    if (user instanceof Error) return Promise.reject(user)

    return (user)
}

/**
 * PUT v1/user insertion controller
 */
export const v1_PUT_user_insert = async (params: {
    user_id: string
    gender: 'male'|'female'
    age: number
}) => {
    // Insert User into the Database
    const insertion = await Database.Insert.User(params).catch((err: Error) => err)
    if (insertion instanceof Error) return Promise.reject(insertion)

    return true
}

/**
 * PUT v1/user update controller
 */
export const v1_PUT_user_update = async (params: {
    user_id: string
    age: number
}) => {
    const update = await Database.Update.User(params).catch((err: Error) => err)
    if (update instanceof Error) return Promise.reject(update)

    return true
}

/**
 * PUT v1/user insert or update controller
 */
export const v1_PUT_user_insertOrUpdate = async (params: {
    user_id: string
    gender: 'male'|'female'
    age: number
}) => {
    const IoU = await Database.InsertOrUpdate.User(params).catch((err: Error) => err)
    if (IoU instanceof Error) return Promise.reject(IoU)

    return true
}

/**
 * DELETE v1/user controller
 */
export const v1_DELETE_user = async (user_id: string) => {
    const deletion = await Database.Delete.User(user_id).catch((err: Error) => err)
    if (deletion instanceof Error) return Promise.reject(deletion)

    return true
}
