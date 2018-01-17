import { deprecated } from 'core-decorators'
import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
    API_URL,
    API_ALL_JOBS,
    API_VACANCY_ROOT,
} from './../constants/api';

import {
    ROUTE_COMPANY_JOBS_OPEN,
    ROUTE_COMPANY_JOBS_DRAFTS,
    ROUTE_COMPANY_JOBS_CLOSED,
} from './../constants/routes';

import {
    ANNUAL_INCOME_DROPDOWN_DATA,
    EXPERIENCE_DROPDOWN_DATA,
    FIELD_OF_EXPERTISE_DROPDOWN_DATA,
} from './../constants/candidateOnboarding';

import {
    DEGREES_DROPDOWN_DATA,
    EMPLOYEMENTS_DROPDOWN_DATA,
} from './../constants/companyJobs';

import {
    CREATE_JOB_SUCCEEDED,
    CREATE_JOB_FAILED,

    UPDATE_JOB_SUCCEEDED,

    OPEN_JOB_SUCCEEDED,
    CLOSE_JOB_SUCCEEDED,
    DELETE_JOB_SUCCEEDED,

    UPDATE_COMPANY_SUCCEEDED,
    CLOSE_OPENED_NEW_JOB_CARD,

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
