import {takeLatest} from 'redux-saga';
import {put} from 'redux-saga/effects';
import {push} from 'react-router-redux';
import {ALL_FETCH_FAILED, BOOKMARKED_FETCH_FAILED, VIEW_COMPANY, VIEW_VACANCY,} from './../constants/candidateMatches';
import {getCandidateMatches} from './../reducers/candidateMatches';
import {
    fetchAllFailed,
    fetchAllSucceeded,
    fetchBookmarked,
    fetchBookmarkedFailed,
    fetchBookmarkedSucceeded,
    fetchNotInterested,
    fetchNotInterestedFailed,
    fetchNotInterestedSucceeded,
} from './../actions/candidateMatches';

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
            const { cid, id } = payload
            // yield put(fetchVacancy(id))
            yield put(push(`/candidate/matches/company/${cid}/vacancy/${id}`))
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
