import errors from '../../errors'
import getRouteQueries from './getRouteQueries'

test('getRouteQueries', () => {
    let query: any = {}
    expect(getRouteQueries(query)).toBe({})

    query.user_id = 1
    expect(getRouteQueries(query)).toBe(Error(errors.queries.INVALID_USER_ID))

    query.user_id = '1'
    expect(getRouteQueries(query)).toBe({ user_id: '1' })

    query.user_id = undefined
    query.limit = -1
    expect(getRouteQueries(query)).toBe(Error(errors.queries.INVALID_LIMIT))

    query.limit = 1
    expect(getRouteQueries(query)).toBe({ limit: 1 })

    query.limit = undefined
    query.offset = -1
    expect(getRouteQueries(query)).toBe(Error(errors.queries.INVALID_OFFSET))

    query.offset = 1
    expect(getRouteQueries(query)).toBe({ offset: 1 })

    query.offset = undefined
    query.order_by = []
    expect(getRouteQueries(query)).toBe(Error(errors.queries.INVALID_ORDER_BY))

    query.order_by = ''
    expect(getRouteQueries(query)).toBe({ order_by: '' })

    query.order_by = undefined
    query.order_direction = ''
    expect(getRouteQueries(query)).toBe(Error(errors.queries.INVALID_ORDER_DIRECTION))

    query.order_direction = 'desc'
    expect(getRouteQueries(query)).toBe({ order_direction: 'desc' })

    query = {
        user_id: '1',
        gender: 'male',
        limit: 0,
        offset: 0,
        order_by: 'age',
        order_direction: 'desc',
    }
    expect(getRouteQueries(query)).toBe({
        user_id: '1',
        gender: 'male',
        limit: 0,
        offset: 0,
        order_by: 'age',
        order_direction: 'desc',
    })
})
