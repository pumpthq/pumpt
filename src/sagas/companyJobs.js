import {takeLatest} from 'redux-saga';
import {put} from 'redux-saga/effects';
import {push} from 'react-router-redux';

import {ROUTE_COMPANY_JOBS_DRAFTS, ROUTE_COMPANY_JOBS_OPEN,} from './../constants/routes';

import {
    CLOSE_OPENED_NEW_JOB_CARD,
    CREATE_JOB_SUCCEEDED,
    UPDATE_COMPANY_SUCCEEDED,
    UPDATE_JOB_SUCCEEDED,
} from './../constants/companyJobs';

export default function () {
    return [
        takeLatest(CREATE_JOB_SUCCEEDED, function * (action) {
          const { job } = action.payload
          yield put(push(ROUTE_COMPANY_JOBS_DRAFTS))
        }),

        takeLatest(UPDATE_JOB_SUCCEEDED, function * (action) {
          const { job } = action.payload
          if(job.status === 'opened') {
						yield put(push(ROUTE_COMPANY_JOBS_OPEN))
					} else {
						yield put(push(ROUTE_COMPANY_JOBS_DRAFTS))
					}
        }),

        takeLatest(UPDATE_COMPANY_SUCCEEDED, function * (action) {
          yield put(push(ROUTE_COMPANY_JOBS_DRAFTS))
        }),
    ];
}
