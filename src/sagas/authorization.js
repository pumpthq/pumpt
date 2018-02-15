import { takeLatest } from 'redux-saga';
import { push } from 'react-router-redux';
import { put } from 'redux-saga/effects';
import {
  AUTHENTICATION_FAILED,
  AUTHENTICATION_SUCCEEDED,
  FORGOT_PASSWORD_SUCCEEDED,
  RESOLVE_USER_SUCCEEDED,
  USER_LOGOUT_SUCCEEDED,
} from './../constants/authorization';

import { login } from './../actions/authorization';

import { fetchCandidate, fetchMatches } from './../actions/candidateMatches';
import { fetchCompany, fetchJobs, fetchRecruiter } from './../actions/companyJobs';
import {
  ROUTE_APPLICATION_CANDIDATE,
  ROUTE_APPLICATION_COMPANY,
  ROUTE_CANDIDATE_MATCHES_ALL,
  ROUTE_COMPANY_JOBS_OPEN,
  ROUTE_LOGIN,
} from './../constants/routes';

export function uiLogin({ email, password }) {
  return dispatch => {
    const credentials = { email, password };
    dispatch(login(credentials));
  };
}

export default function () {
  return [
    takeLatest(RESOLVE_USER_SUCCEEDED, function* (action) {
      const { payload } = action;
      const { isCandidate, isNotApproved, isRecruiter } = payload;

      if (isCandidate && isNotApproved) {
        yield put(fetchCandidate());
        yield put(push(ROUTE_APPLICATION_CANDIDATE));
      } else if (isRecruiter && isNotApproved) {
        yield put(fetchRecruiter());
        yield put(fetchCompany());
        yield put(push(ROUTE_APPLICATION_COMPANY));
      } else if (isCandidate) {
        yield put(fetchCandidate());
        yield put(fetchMatches());
      } else if (isRecruiter) {
        yield put(fetchRecruiter());
        yield put(fetchCompany());
        yield put(fetchJobs());
      }
    }),
    takeLatest(AUTHENTICATION_SUCCEEDED, function* (action) {
      const { payload } = action;

      const { isCandidate, isNotApproved, isRecruiter } = payload;

      if (isCandidate && isNotApproved) {
        yield put(fetchCandidate());
        yield put(push(ROUTE_APPLICATION_CANDIDATE));
      } else if (isRecruiter && isNotApproved) {
        yield put(fetchRecruiter());
        yield put(fetchCompany());
        yield put(push(ROUTE_APPLICATION_COMPANY));
      } else if (isCandidate && !isNotApproved) {
        yield put(fetchCandidate());
        yield put(fetchMatches());
        yield put(push(ROUTE_CANDIDATE_MATCHES_ALL));
      } else if (isRecruiter && !isNotApproved) {
        yield put(fetchRecruiter());
        yield put(fetchCompany());
        yield put(fetchJobs());
        yield put(push(ROUTE_COMPANY_JOBS_OPEN));
      }
    }),
    takeLatest(AUTHENTICATION_FAILED, function* () {
      yield put(push(ROUTE_LOGIN));
    }),
    takeLatest(USER_LOGOUT_SUCCEEDED, function* () {
      yield put(push(ROUTE_LOGIN));
    }),
    takeLatest(FORGOT_PASSWORD_SUCCEEDED, function* () {
      yield put(push(ROUTE_LOGIN));
    }),
  ];
}
