import {
    ADD_API_ERROR,
    RESET_API_ERROR,
    API_ERROR
} from '../actions/apiError';

const DEFAULT_STATE = {};

export default (state = DEFAULT_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_API_ERROR:
            return { ...payload };

        case RESET_API_ERROR:
            return DEFAULT_STATE;

        case API_ERROR:
            throw payload.err
            return state

        default :
            return state;
    }
};
