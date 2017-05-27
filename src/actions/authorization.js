import {
    // AUTHENTICATION_CANDIDATE_REQUESTED,
    AUTHENTICATION_CANDIDATE_SUCCEEDED,
    // AUTHENTICATION_CANDIDATE_FAILED,

    // AUTHENTICATION_COMPANY_REQUESTED,
    AUTHENTICATION_COMPANY_SUCCEEDED,
    // AUTHENTICATION_COMPANY_FAILED,

    // AUTHENTICATION_REQUESTED,
    AUTHENTICATION_SUCCEEDED,
    AUTHENTICATION_FAILED,

    // CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCEEDED,
    CHANGE_PASSWORD_FAILED,

    // USER_LOGOUT_REQUESTED,
    USER_LOGOUT_SUCCEEDED,
    // USER_LOGOUT_FAILED,

    LOGIN_AT_BEGIN,

    RESOLVE_USER_SUCCEEDED,

    // FORGOT_PASSWORD,
} from './../constants/authorization';
import {
    API_CHANGE_PASSWORD
} from './../constants/api'

import { API } from '../constants/actionTypes'
import { fetchFailed } from '../actions/api';

export const resolveUser = () => ({
    type: API,
    payload : {
        url : '/users/current',
        method: 'GET',
        success: resolveUserSucceeded,
        error: loginFailed
    }
});

export const resolveUserSucceeded = (data) => ({
    type: RESOLVE_USER_SUCCEEDED,
    payload: data
});

export const resolveUserFailed = () => ({
    type: RESOLVE_USER_FAILED,
});

export const changePassword = (data) => ({
    type: API,
    payload: {
        method: 'PATCH',
        url: API_CHANGE_PASSWORD,
        data,
        success: changePasswordSucceeded,
        error: fetchFailed
    }
});

export const changePasswordSucceeded = () => ({
    type: CHANGE_PASSWORD_SUCCEEDED,
});
//
// export const changePasswordFailed = () => ({
//     type: CHANGE_PASSWORD_FAILED,
// });

export const login = ({ email, password }) => ({
    type: API,
    payload : {
        url : '/authentication/login',
        method: 'POST',
        data: { email, password },
        success: loginSucceeded,
        error: fetchFailed
    }
});

export const loginSucceeded = (data) => ({
    type: AUTHENTICATION_SUCCEEDED,
    payload: data
});

export const loginFailed = () => ({
    type: AUTHENTICATION_FAILED,
});

// export const loginAtBegin = ({ email, password }) => ({
//     type: LOGIN_AT_BEGIN,
//     payload: {
//         email,
//         password,
//     },
// });

export const logOut = () => ({
    type: API,
    payload : {
        url : '/authentication/logout',
        method: 'GET',
        success: logOutSucceeded,
        error: fetchFailed
    }
});

export const logOutSucceeded = ({ }) => ({
    type: USER_LOGOUT_SUCCEEDED,
});

// export const logOutFailed = ({ }) => ({
//     type: USER_LOGOUT_FAILED,
// });

export const forgotPassword = ({ email }) => ({
    type: API,
    payload: {
        method: 'PATCH',
        url: API_FORGOT_PASSWORD,
        data: { email },
        success: forgotPasswordSucceeded,
        error: fetchFailed
    }
});

export const forgotPasswordSucceeded = ({ }) => ({
    type: FORGOT_PASSWORD_SUCCEEDED,
});

export const resendToken = (email) => ({
    type: API,
    payload: {
        url: `/users/resend/${email}`,
        success: resendTokenSucceeded,
        error: fetchFailed
    }
})

export const resendTokenSucceeded = () => ({
    type: RESEND_TOKEN_SUCCEEDED,
});
