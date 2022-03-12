import errors from '../../errors'
import type { RouteBody } from './types'

/**
 * Verify and give types to req.body
 */
export default (body: any): RouteBody|Error => {
    let user_id: string|undefined
    if (body.user_id) {
        if (typeof body.user_id === 'string') {
            user_id = body.user_id
        } else {
            const err = Error(errors.body.INVALID_USER_ID)
            err.name = errors.types.INVALID_REQUEST
            return err
        }
    }

    let gender: 'male'|'female'|undefined
    if (body.gender) {
        if (body.gender === 'male' || body.gender === 'female') {
            gender = body.gender
        } else {
            const err = Error(errors.body.INVALID_GENDER)
            err.name = errors.types.INVALID_REQUEST
            return err
        }
    }

    let age: number|undefined
    if (body.age) {
        if (typeof body.age === 'number') {
            age = body.age
        } else {
            const err = Error(errors.body.INVALID_AGE)
            err.name = errors.types.INVALID_REQUEST
            return err
        }
    }

    return {
        user_id,
        gender,
        age,
    }
}
