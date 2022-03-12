export default {
    data: {
        NO_ROWS_AFFECTED: 'could not find any matching rows',
        NO_ROWS: 'could not find any matching rows',
        TOO_MANY_ROWS: 'more than a single row was found',
    },
    internal: {
        UNKNOWN_ERROR: 'UNKNOWN ERROR',
        MYSQL_QUERY: 'MYSQL QUERY ERROR',
        NO_SELECTOR: 'collection_name is missing',
    },
    queries: {
        INVALID_DUPLICATE: 'duplicate queries are not allowed',
        INVALID_ORDER_BY: 'invalid value for order_by query',
        INVALID_ORDER_DIRECTION: 'invalid value for order_direction query',
        INVALID_LIMIT: 'invalid value for limit query',
        INVALID_OFFSET: 'invalid value for offset query',
        INVALID_USER_ID: 'invalid value for user_id query',
        INVALID_GENDER: 'invalid value for gender query',
    },
    body: {
        INVALID_USER_ID: 'invalid value for user_id key',
        INVALID_GENDER: 'invalid value for gender key',
        INVALID_AGE: 'invalid value for age key',
    },
    types: {
        INVALID_REQUEST: 'INVALID_REQUEST',
        NOT_FOUND: 'NOT_FOUND',
        UNAUTHORIZED: 'UNAUTHORIZED',
    },
}
