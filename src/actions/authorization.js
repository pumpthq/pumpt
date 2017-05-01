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

    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCEEDED,
    CHANGE_PASSWORD_FAILED,

    USER_LOGOUT_REQUESTED,
    USER_LOGOUT_SUCCEEDED,
    USER_LOGOUT_FAILED,

    LOGIN_AT_BEGIN,

    FORGOT_PASSWORD,
} from './../constants/authorization';

export const changePasswordRequest = (oldPassword, newPassword) => ({
    type: CHANGE_PASSWORD_REQUEST,
    payload: { oldPassword, newPassword },
});

export const changePasswordSucceeded = () => ({
    type: CHANGE_PASSWORD_SUCCEEDED,
});

export const changePasswordFailed = () => ({
    type: CHANGE_PASSWORD_FAILED,
});

export const signInCandidate = ({ email, password }) => ({
    type: AUTHENTICATION_CANDIDATE_REQUESTED,
    payload: {
        email,
        password,
    },
});

export const saveCandidateAccessToken = ({ userId, entityId, accessToken }) => ({
    type: AUTHENTICATION_CANDIDATE_SUCCEEDED,
    payload: {
        userId,
        entityId,
        accessToken,
    },
});

export const signInCandidateFailed = ({ }) => ({
    type: AUTHENTICATION_CANDIDATE_FAILED,
    payload: {},
});

export const signInCompany = ({ email, password }) => ({
    type: AUTHENTICATION_COMPANY_REQUESTED,
    payload: {
        email,
        password,
    },
});

export const saveCompanyAccessToken = ({ userId, entityId, accessToken }) => ({
    type: AUTHENTICATION_COMPANY_SUCCEEDED,
    payload: {
        userId,
        entityId,
        accessToken,
    },
});

export const signInCompanyFailed = ({ }) => ({
    type: AUTHENTICATION_COMPANY_FAILED,
    payload: {},
});

export const signIn = ({ email, password }) => ({
    type: AUTHENTICATION_REQUESTED,
    payload: {
        email,
        password,
    },
});

export const saveAccessToken = ({
    userId,
    entityId,
    isRecruiter,
    isCandidate,
    companyId,
    isNotApproved,
    accessToken,
}) => ({
    type: AUTHENTICATION_SUCCEEDED,
    payload: {
        userId,
        entityId,
        isRecruiter,
        isCandidate,
        companyId,
        isNotApproved,
        accessToken,
    },
});

export const loginSucceeded = (data) => ({
    type: AUTHENTICATION_SUCCEEDED,
    payload: data
});


export const signInFailed = ({ }) => ({
    type: AUTHENTICATION_FAILED,
    payload: {},
});

export const loginAtBegin = ({ email, password }) => ({
    type: LOGIN_AT_BEGIN,
    payload: {
        email,
        password,
    },
});

export const logOut = () => ({
    type: USER_LOGOUT_REQUESTED,
});

export const logOutSucceeded = ({ }) => ({
    type: USER_LOGOUT_SUCCEEDED,
});

export const logOutFailed = ({ }) => ({
    type: USER_LOGOUT_FAILED,
});

export const forgotPassword = ({ email }) => ({
    type: FORGOT_PASSWORD,
    payload: {
        email,
    },
});
