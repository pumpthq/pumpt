// export const RESET_API_ERROR = 'RESET_API_ERROR';
// export const ADD_API_ERROR = 'ADD_API_ERROR';
export const API_ERROR = 'API_ERROR'
export const API_REQUEST = 'API_REQUEST'
export const API_SUCCESS = 'API_SUCCESS'

// export const addApiError = message => ({
//     type: ADD_API_ERROR,
//     payload: { message },
// });

// export const resetApiError = () => ({
//     type: RESET_API_ERROR,
// });

export const fetchFailed = err => ({
    type : API_ERROR,
    payload : { err }
})

export const fetchSucceeded = data => ({
    type : API_SUCCESS,
    payload : { data }
})

export const fetchRequested = props => ({
    type : API_REQUEST,
    ...props
})
