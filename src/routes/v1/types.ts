export interface RouteBody {
    user_id?: string
    gender?: 'male'|'female'
    age?: number
}

export interface RouteQueries {
    user_id?: string
    gender?: string

    limit?: number
    offset?: number

    order_by?: string
    order_direction?: 'asc'|'desc'
}
