import axios from 'axios';
import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
    API_URL,
    API_ALL_MATCHES,
    API_BOOKMARKED_MATCHES,
    API_NOT_INTERESTED_MATCHES
} from './../constants/api';
import {
    ROUTE_CANDIDATE_MATCHES_ALL,
    ROUTE_CANDIDATE_MATCHES_BOOKMARKED,
    ROUTE_CANDIDATE_MATCHES_NOT_INTERESTED,
} from './../constants/routes';
import {
    ROUTE_TO_ALL,
    ROUTE_TO_BOOKMARKED,
    ROUTE_TO_NOT_INTERESTED,

    ALL_FETCH_FAILED,
    BOOKMARKED_FETCH_FAILED,
    NOT_INTERESTED_FETCH_FAILED,
} from './../constants/candidateMatches';
import {
    getCandidateMatches
} from './../reducers/candidateMatches';
import {
    fetchAll,
    fetchAllSucceeded,
    fetchAllFailed,

    fetchBookmarked,
    fetchBookmarkedSucceeded,
    fetchBookmarkedFailed,

    fetchNotInterested,
    fetchNotInterestedSucceeded,
    fetchNotInterestedFailed,

    routeToAll,
    routeToBookmarked,
    routeToNotInterested
} from './../actions/candidateMatches';
import {
    logOut,
} from './../actions/authorization';
import {
    getAccessToken,
} from './../reducers/authorization';

const getAllMatches = ({ accessToken }) => {
    return axios({
        method: 'GET',
        baseURL: API_URL,
        url: API_ALL_MATCHES,
        headers: {
            'access-token': accessToken,
        },
        responseType: 'json',
    }).then(response => response.data);
};

const getBookmarkedMatches = ({ accessToken }) => {
    return axios({
        method: 'GET',
        baseURL: API_URL,
        url: API_BOOKMARKED_MATCHES,
        headers: {
            'access-token': accessToken,
        },
        responseType: 'json',
    }).then(response => response.data);
};

const getNotInterestedMatches = ({ accessToken }) => {
    return axios({
        method: 'GET',
        baseURL: API_URL,
        url: API_NOT_INTERESTED_MATCHES,
        headers: {
            'access-token': accessToken,
        },
        responseType: 'json',
    }).then(response => response.data);
};

export default function () {
    return [
        takeLatest(ROUTE_TO_ALL, function * () {
            const { accessToken } = yield select(getAccessToken);

            yield put(fetchAll())

            let allMatches

            try {
                allMatches = yield call(getAllMatches, { accessToken })
            } catch (ex) {
                const statusCode = ex.status

                console.log('Retrieving all matches fails', ex)
                return yield put(fetchAllFailed({ statusCode }))
            }

            yield put(fetchAllSucceeded({ matches : allMatches }))
            yield put(routeToAll())
        }),
        takeLatest(ROUTE_TO_BOOKMARKED, function * () {
            const { accessToken } = yield select(getAccessToken);

            yield put(fetchBookmarked())

            let bookmarkedMatches

            try {
                bookmarkedMatches = yield call(getBookmarkedMatches, { accessToken })
            } catch (ex) {
                const statusCode = ex.status

                console.log('Retrieving bookmarked matches fails', ex)
                return yield put(fetchBookmarkedFailed({ statusCode }))
            }

            yield put(fetchBookmarkedSucceeded({ matches : bookmarkedMatches }))
            yield put(routeToBookmarked())
        }),
        takeLatest(ROUTE_TO_NOT_INTERESTED, function * () {
            const { accessToken } = yield select(getAccessToken);

            yield put(fetchNotInterested())

            let notInterestedMatches

            try {
                notInterestedMatches = yield call(getNotInterestedMatches, { accessToken })
            } catch (ex) {
                const statusCode = ex.status

                console.log('Retrieving not interested matches fails', ex)
                return yield put(fetchNotInterestedFailed({ statusCode }))
            }

            yield put(fetchNotInterestedSucceeded({ matches : notInterestedMatches }))
            yield put(routeToNotInterested())
        }),
        takeLatest([
            ALL_FETCH_FAILED,
            BOOKMARKED_FETCH_FAILED,
            NOT_INTERESTED_FETCH_FAILED
        ], function * (action) {
            const { statusCode } = action.payload

            if (statusCode === 401) {
                yield put(logOut());
            }
        })
    ];
}

