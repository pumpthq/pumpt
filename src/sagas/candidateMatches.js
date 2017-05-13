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

    VIEW_COMPANY,
    VIEW_VACANCY,
} from './../constants/candidateMatches';
import {
    getCandidateMatches
} from './../reducers/candidateMatches';
import {
    fetchMatches,
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
    routeToNotInterested,

    fetchCompany,
    fetchVacancy,

} from './../actions/candidateMatches';
import {
    logOut,
} from './../actions/authorization';
import {
    getAccessToken,
} from './../reducers/authorization';

export default function () {
    return [
        takeLatest(VIEW_COMPANY, function * (action) {
            const { payload } = action
            const { id } = payload
            // yield put(fetchCompany(id))
            yield put(push(`/candidate/matches/company/${id}`))
        }),
        takeLatest(VIEW_VACANCY, function * (action) {
            const { payload } = action
            const { id } = payload
            // yield put(fetchVacancy(id))
            yield put(push(`/candidate/matches/vacancy/${id}`))
        })
        // takeLatest(ROUTE_TO_ALL, function * () {
        //     // const { accessToken } = yield select(getAccessToken);
        //     yield put(fetchMatches())
        // })
        // ,
        // takeLatest(ROUTE_TO_BOOKMARKED, function * () {
        // //     yield put(fetchBookmarked())
        // }),
        // takeLatest(ROUTE_TO_NOT_INTERESTED, function * () {
        // //     yield put(fetchNotInterested())
        // })
    ];
}
