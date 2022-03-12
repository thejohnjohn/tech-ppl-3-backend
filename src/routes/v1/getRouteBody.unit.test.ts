import errors from '../../errors'
import getRouteBody from './getRouteBody'

test('getRouteBody', () => {
    let body: any = {}
    expect(getRouteBody(body)).toBe({})

    body.user_id = 1
    expect(getRouteBody(body)).toBe(Error(errors.body.INVALID_USER_ID))

    body.user_id = '1'
    expect(getRouteBody(body)).toBe({ user_id: '1' })

    body.user_id = undefined
    body.gender = ''
    expect(getRouteBody(body)).toBe(Error(errors.body.INVALID_GENDER))

    body.gender = 'male'
    expect(getRouteBody(body)).toBe({ gender: 'male' })

    body.gender = undefined
    body.age = ''
    expect(getRouteBody(body)).toBe(Error(errors.body.INVALID_AGE))

    body.age = 0
    expect(getRouteBody(body)).toBe({ age: 0 })

    body = {
        user_id: '1',
        gender: 'male',
        age: 0,
    }
    expect(getRouteBody(body)).toBe({
        user_id: '1',
        gender: 'male',
        age: 0,
    })
})
