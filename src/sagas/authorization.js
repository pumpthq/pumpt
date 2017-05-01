import axios from 'axios';
import { takeLatest } from 'redux-saga';
import { push } from 'react-router-redux';
import { select, call, put, take } from 'redux-saga/effects';

import { changePassword } from '../api';

import {
    API_URL,
    API_LOGIN,
    API_LOGOUT,
    API_CANDIDATE_ROOT,
    API_COMPANY_ROOT,
    API_FORGOT_PASSWORD,
} from './../constants/api';
import {
    AUTHENTICATION_CANDIDATE_REQUESTED,
    AUTHENTICATION_COMPANY_REQUESTED,
    AUTHENTICATION_REQUESTED,
    AUTHENTICATION_SUCCEEDED,
    AUTHENTICATION_FAILED,
    CHANGE_PASSWORD_REQUEST,
    LOGIN_AT_BEGIN,
    USER_LOGOUT_REQUESTED,
    USER_LOGOUT_SUCCEEDED,
    USER_LOGOUT_FAILED,
    FORGOT_PASSWORD,
} from './../constants/authorization';
import {
    changePasswordSucceeded,
    changePasswordFailed,
    saveCandidateAccessToken,
    signInCandidateFailed,
    saveCompanyAccessToken,
    signInCompanyFailed,
    loginAtBegin,
    saveAccessToken,
    saveProfile,
    signInFailed,
    signIn,
    logOutFailed,
    logOutSucceeded,
} from './../actions/authorization';
import {
    getAccessToken,
} from './../reducers/authorization';
import {
    ROUTE_APPLICATION_CANDIDATE,
    ROUTE_APPLICATION_COMPANY,
    ROUTE_DEFAULT,
    ROUTE_LOGIN,
    ROUTE_CANDIDATE_MATCHES_ALL,
    ROUTE_COMPANY_JOBS_OPEN,
} from './../constants/routes';
import { getLatestProfile, clearApplicationCandidateState } from './../actions/applicationCandidate';
import { clearApplicationCompanyState } from './../actions/applicationCompany';
import { getLatestProfile as getLatestCandidateProfile } from './../actions/applicationCandidate';
import { getLatestProfile as getLatestCompanyProfile } from './../actions/applicationCompany';
import { clearMediaState } from './../actions/applicationPhotoUploading';
import { clearCompanyJobsState } from './../actions/companyJobs';
import { clearCandidateMatchesState } from './../actions/candidateMatches';
import {
    routeToOpen as navigateToOpenJobs,
} from './../actions/companyJobs';
import {
    routeToAll as navigateToAllMatches,
} from './../actions/candidateMatches';

import { addApiError } from '../actions/apiError';

const apiLogin = ({ email, password }) =>
     axios.post(`${API_URL}${API_LOGIN}`, {
         email,
         password,
     }).then((response) => (response.data))
;

 const cleanMessageOnSession = () =>
     axios
        .get(`${API_URL}/users/clean`)
        .then(response => (response.data))
;

const apiLogOut = () =>
     axios.get(`${API_URL}${API_LOGOUT}`)
        .then((response) => (response.data))
;

const apiResentTokenToEmail = email =>
     axios.get(`${API_URL}/users/resend/${email}`)
        .then((response) => (response.data))
;

const apiForgotPassword = ({ email }) =>
     axios({
         method: 'PATCH',
         baseURL: API_URL,
         url: API_FORGOT_PASSWORD,
         data: {
             email: email.value,
         },
         responseType: 'json',
     }).then((response) => (response.data))
;

export function uiLogin({ email, password }) {
    const credentials = { email, password };
    const { dispatch } = this;

    return dispatch(signIn(credentials))
}

const composeProfile = ({ response }) => {
    const { entityType } = response;

    switch (entityType) {
        case 'Candidate' :
            return {
                ...response,
                userId: response._id,
                isCandidate: true,
            };
        case 'Recruiter' :
            return {
                ...response,
                userId: response._id,
                isRecruiter: true,
                companyId: response.companyId,
            };
        default :
            return {};
    }
};

export default function () {
    return [
        takeLatest(CHANGE_PASSWORD_REQUEST, function* (action) {
            try {
                yield call(changePassword, action.payload);
                yield put(changePasswordSucceeded());
            } catch (ex) {
                const { data: { message } } = ex;
                yield put(changePasswordFailed(message));
            }
        }),
        takeLatest('RESEND_TOKEN_TO_EMAIL', function* (action) {
            const { payload: { email } } = action;

            try {
                yield call(apiResentTokenToEmail, email);
            } catch (ex) {
                console.log(ex);
            }
        }),
        takeLatest('CLEAN_MESSAGE', function* () {
            try {
                yield put(cleanMessageOnSession());
            } catch (ex) {
                console.log(ex);
            }
        }),
        takeLatest(AUTHENTICATION_CANDIDATE_REQUESTED, function* (action) {
            const { payload } = action;

            try {
                const resp = yield call(apiLogin, payload);
                const profile = {
                    ...resp,
                    userId: resp._id,
                    isCandidate: true,
                };

                yield put(saveCandidateAccessToken(profile));
            } catch (ex) {
                yield put(signInCandidateFailed({}));
            }
        }),
        takeLatest(AUTHENTICATION_COMPANY_REQUESTED, function* (action) {
            const { payload } = action;

            try {
                const resp = yield call(apiLogin, payload);
                const profile = {
                    ...resp,
                    userId: resp._id,
                    isRecruiter: true,
                };

                yield put(saveCompanyAccessToken(profile));
            } catch (ex) {
                yield put(signInCompanyFailed({}));
            }
        }),
        takeLatest(AUTHENTICATION_REQUESTED, function* (action) {
            const { payload } = action;

            try {
                const response = yield call(apiLogin, payload);
                // const profile = composeProfile({ response });
                //
                const {isCandidate, isNotApproved, isRecruiter} = response
                yield put(loginSucceeded(response));

                if (isCandidate && isNotApproved) {
                    yield put(getLatestCandidateProfile());
                    yield put(push(ROUTE_APPLICATION_CANDIDATE));
                } else if (isRecruiter && isNotApproved) {
                    yield put(getLatestCompanyProfile());
                    yield put(push(ROUTE_APPLICATION_COMPANY));
                } else if (isCandidate && !isNotApproved) {
                    yield put(getLatestCandidateProfile());
                    yield put(push(ROUTE_CANDIDATE_MATCHES_ALL));
                    yield put(navigateToAllMatches());
                } else if (isRecruiter && !isNotApproved) {
                    yield put(getLatestCompanyProfile());
                    yield put(push(ROUTE_COMPANY_JOBS_OPEN));
                    yield put(navigateToOpenJobs());
                }

            } catch (ex) {
                yield put(signInFailed({}));
            }
        }),
        takeLatest(USER_LOGOUT_REQUESTED, function* () {
            try {
                yield call(apiLogOut);
                yield put(logOutSucceeded({}));
                yield put(clearApplicationCandidateState());
                yield put(clearApplicationCompanyState());
                yield put(clearMediaState());
                yield put(clearCompanyJobsState());
                yield put(clearCandidateMatchesState());
                yield put(push(ROUTE_DEFAULT));
            } catch (ex) {
                yield put(logOutFailed({}));
            }
        }),
        takeLatest(FORGOT_PASSWORD, function* (action) {
            const { payload } = action;

            try {
                yield call(apiForgotPassword, payload);
                yield put(push(ROUTE_LOGIN));
            } catch (ex) {
                const { data: { message } } = ex;
                console.log('ERROR: ', message);
                yield put(addApiError(message));
            }
        }),
    ];
}
