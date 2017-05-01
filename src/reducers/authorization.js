import {
    AUTHENTICATION_CANDIDATE_REQUESTED,
    AUTHENTICATION_CANDIDATE_SUCCEEDED,
    AUTHENTICATION_CANDIDATE_FAILED,
    AUTHENTICATION_COMPANY_REQUESTED,
    AUTHENTICATION_COMPANY_SUCCEEDED,
    AUTHENTICATION_COMPANY_FAILED,
    AUTHENTICATION_REQUESTED,
    AUTHENTICATION_SUCCEEDED,
    AUTHENTICATION_FAILED,
    CHANGE_PASSWORD_SUCCEEDED,
    FORGOT_PASSWORD,
} from './../constants/authorization';

const defaultState = {
    // email: null,
    // password: null,
    // userId: null,
    // entityId: null,
    // accessToken: null,
};

export default (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case AUTHENTICATION_CANDIDATE_REQUESTED :
        case AUTHENTICATION_COMPANY_REQUESTED :
        case AUTHENTICATION_REQUESTED :
            return {
                ...state
                // ...defaultState,
            };

        case AUTHENTICATION_CANDIDATE_SUCCEEDED :
            return {
                ...state,
                password: null,
                isCandidate: true,
                ...payload,
            };
        case AUTHENTICATION_COMPANY_SUCCEEDED :
            return {
                ...state,
                password: null,
                isRecruiter: true,
                ...payload,
            };
        case AUTHENTICATION_SUCCEEDED :
            return {
                ...state,
                ...payload,
            };

        case FORGOT_PASSWORD :
            return {
                defaultState,
                ...payload,
            };

        case AUTHENTICATION_CANDIDATE_FAILED :
        case AUTHENTICATION_COMPANY_FAILED :
        case AUTHENTICATION_FAILED :
            return defaultState;

        case CHANGE_PASSWORD_SUCCEEDED : {
            alert('You successfully changed password.');
            return state;
        }
        default :
            return state;
    }
};

export const getAccessToken = (state) => (state.authorization);
