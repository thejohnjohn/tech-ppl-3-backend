export interface Limiters {
    limit: number
    offset: number
}

export interface Ordering {
    orderBy?: string
    orderDirection?: 'asc'|'desc'
}
