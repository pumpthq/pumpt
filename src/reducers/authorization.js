import {
    AUTHENTICATION_SUCCEEDED,
    RESOLVE_USER_SUCCEEDED,
    CHANGE_PASSWORD_SUCCEEDED,
    FORGOT_PASSWORD_SUCCEEDED,
    USER_LOGOUT_SUCCEEDED,
    FINISH_APPLICATION_SUCCEEDED,
} from './../constants/authorization';

const defaultState = {};

export default (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case AUTHENTICATION_SUCCEEDED : {
            return {
                ...state,
                ...payload,
            };

        }

        case RESOLVE_USER_SUCCEEDED : {
            return {
                ...state,
                ...payload,
            }
        }

        case FORGOT_PASSWORD_SUCCEEDED : {
            return {
                ...state,
                ...payload,
            };
        }


        case USER_LOGOUT_SUCCEEDED:
            return { /* empty state */ }


        case CHANGE_PASSWORD_SUCCEEDED : {

            return {
                ...state,
                lastChangePass: (new Date)
            };
        }
        case FINISH_APPLICATION_SUCCEEDED : {

            return {
                ...state,
                isFinished: true,
                lastFinished: (new Date),
            };
        }
        default :
            return state;
    }
};

export const getAccessToken = (state) => (state.authorization);
