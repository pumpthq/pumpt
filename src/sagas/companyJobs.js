import { deprecated } from 'core-decorators'
// import axios from 'axios';
import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import states from './../constants/states.json';
import {
    START_MATCHING,
    CLOSE_JOB,
    DELETE_JOB
} from './../constants/companyJobs'

import {
    API_URL,
    API_ALL_JOBS,
    API_OPEN_JOBS,
    API_DRAFT_JOBS,
    API_CLOSED_JOBS,
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
    ROUTE_TO_OPEN,
    ROUTE_TO_DRAFTS,
    ROUTE_TO_CLOSED,

    OPEN_FETCH_FAILED,
    DRAFTS_FETCH_FAILED,
    CLOSED_FETCH_FAILED,

    SAVE_SUMMARY_DATA,
    SAVE_DESCRIPTION_DATA,
    SAVE_RESPONSIBILITIES_DATA,
    SAVE_SKILLS_AND_REQUIREMENTS_DATA,
    CLOSE_OPENED_NEW_JOB_CARD
} from './../constants/companyJobs';
import {
    getCompanyJobs
} from './../reducers/companyJobs';
import {
    fetchAll,
    fetchAllSucceeded,
    fetchAllFailed,

    fetchOpen,
    fetchOpenSucceeded,
    fetchOpenFailed,

    fetchDrafts,
    fetchDraftsSucceeded,
    fetchDraftsFailed,

    fetchClosed,
    fetchClosedSucceeded,
    fetchClosedFailed,

    saveSummaryDataSucceeded,
    saveSummaryDataFailed,

    routeToOpen,
    routeToDrafts,
    routeToClosed,
    clearNewJobState
} from './../actions/companyJobs';
import {
    logOut,
} from './../actions/authorization';
import {
    getAccessToken,
} from './../reducers/authorization';
import {
    findById as findDropdownItemById,
} from '../constants/dropdownData';

export default function () {
    return [
        takeLatest(SAVE_SUMMARY_DATA, function * () {
            @deprecated
            function handleSummaryData() {
                const { entityId, companyId, accessToken } = yield select(getAccessToken)
                const { newJob } = yield select(getCompanyJobs)
                const {
                    jobTitle,
                    location,
                    salary,
                    experience,
                    employment,
                    degree,
                    industry,
                } = newJob;
                const selectedItemIndustry = findDropdownItemById({
                    id: industry.id,
                    data: FIELD_OF_EXPERTISE_DROPDOWN_DATA,
                });
                const locationState = location.split(', ').pop();
                const patch = {
                    id: entityId,
                    accessToken,
                    body: {
                        // TODO complete mapping
                        title: jobTitle,
                        industry: industry.value,
                        industryParent: selectedItemIndustry.parent ?
                            selectedItemIndustry.parent.title : null,
                        salary: salary.value,
                        company: companyId,
                        recruiter: entityId,
                        experience: experience.value,
                        employment: employment.value,
                        degree: degree.value,
                        state: states[locationState],
                    },
                };

                try {
                    yield call(createJob, patch);

                    yield put(saveSummaryDataSucceeded({}));
                } catch (ex) {
                    console.log('Create new job fails', ex)
                    yield put(saveSummaryDataFailed({}))
                }
            }()
        }),
        // takeLatest(ROUTE_TO_OPEN, function * () {
        //     const { accessToken } = yield select(getAccessToken);
        //
        //     yield put(fetchOpen())
        //
        //     let openJobs
        //
        //     try {
        //         openJobs = yield call(getOpenJobs, { accessToken })
        //     } catch (ex) {
        //         const statusCode = ex.status
        //
        //         console.log('Retrieving open jobs fails', ex)
        //         return yield put(fetchOpenFailed({ statusCode }))
        //     }
        //
        //     yield put(fetchOpenSucceeded({ jobs : openJobs }))
        //     yield put(push(ROUTE_COMPANY_JOBS_OPEN))
        // }),
        // takeLatest(ROUTE_TO_DRAFTS, function * () {
        //     const { accessToken } = yield select(getAccessToken);
        //
        //     yield put(fetchDrafts())
        //
        //     let draftsJobs
        //
        //     try {
        //         draftsJobs = yield call(getDraftsJobs, { accessToken })
        //     } catch (ex) {
        //         const statusCode = ex.status
        //
        //         console.log('Retrieving drafts jobs fails', ex)
        //         return yield put(fetchDraftsFailed({ statusCode }))
        //     }
        //
        //     yield put(fetchDraftsSucceeded({ jobs : draftsJobs }))
        //     yield put(push(ROUTE_COMPANY_JOBS_DRAFTS))
        // }),
        // takeLatest(ROUTE_TO_CLOSED, function * () {
        //     const { accessToken } = yield select(getAccessToken);
        //
        //     yield put(fetchClosed())
        //
        //     let closedJobs
        //
        //     try {
        //         closedJobs = yield call(getClosedJobs, { accessToken })
        //     } catch (ex) {
        //         const statusCode = ex.status
        //
        //         console.log('Retrieving closed jobs fails', ex)
        //         return yield put(fetchClosedFailed({ statusCode }))
        //     }
        //
        //     yield put(fetchClosedSucceeded({ jobs : closedJobs }))
        //     yield put(push(ROUTE_COMPANY_JOBS_CLOSED))
        // }),
        // takeLatest([
        //     OPEN_FETCH_FAILED,
        //     DRAFTS_FETCH_FAILED,
        //     CLOSED_FETCH_FAILED
        // ], function * (action) {
        //     const { statusCode } = action.payload
        //
        //     if (statusCode === 401) {
        //         yield put(logOut());
        //     }
        // }),
        // takeLatest(SAVE_DESCRIPTION_DATA, function* (action) {
        //     const { accessToken } = yield select(getAccessToken);
        //     const { description } = action.payload;
        //
        //     try {
        //         yield call(updateJob, {
        //             id: '', // TODO
        //             accessToken,
        //             body: {
        //                 description,
        //             },
        //         });
        //     } catch (ex) {
        //         console.log('Description is not updated:', ex);
        //     }
        // }),
        // takeLatest(CLOSE_JOB, function * (action) {
        //     const { accessToken } = yield select(getAccessToken);
        //     const { id } = action.payload
        //
        //     try {
        //         yield call(updateJob, {
        //             id,
        //             accessToken,
        //             body : {
        //                 status: 'closed'
        //             }
        //         })
        //         yield put(routeToOpen())
        //     } catch (ex) {
        //         console.log(`Close job fails with id ${id}`)
        //     }
        // }),
        // takeLatest(DELETE_JOB, function * (action) {
        //     const { accessToken } = yield select(getAccessToken);
        //     const { id } = action.payload
        //
        //     try {
        //         yield call(updateJob, {
        //             id,
        //             accessToken
        //         })
        //         yield put(routeToDrafts())
        //     } catch (ex) {
        //         console.log(`Delete job fails with id ${id}`)
        //     }
        // }),
        takeLatest(START_MATCHING, function * (action) {
            const { accessToken } = yield select(getAccessToken);
            const { id } = action.payload

            try {
                yield call(updateJob, {
                    id,
                    accessToken,
                    body : {
                        status: 'opened'
                    }
                })
                yield put(routeToDrafts())
            } catch (ex) {
                console.log(`Start matching fails with id ${id}`)
            }
        }),
        takeLatest(CLOSE_OPENED_NEW_JOB_CARD, function * (action) {
            yield put(routeToDrafts());
            yield put(clearNewJobState())
        })
    ];
}
