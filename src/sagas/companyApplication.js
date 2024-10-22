import axios from 'axios';
import {takeLatest} from 'redux-saga';
import {call, fork, put, select} from 'redux-saga/effects';
import {getValues} from 'redux-form';
import {API_COMPANY_ROOT, API_RECRUITER_ROOT, API_URL,} from './../constants/api';
import {
    DESCRIPTION_STEP,
    FETCH_LINKEDIN_DATA_REQUESTED,
    FILL_IN_PROFILE_FAILED,
    GET_LATEST_PROFILE,
    PROFILE_PHOTO_STEP,
    QUOTE_OR_MOTTO_STEP,
    REMOVE_COMPANY_PHOTO,
    SAVE_COMPANY_PHOTO,
    SAVE_DESCRIPTION_DATA,
    SAVE_LOCATION_DATA,
    SAVE_PHOTO_STEP,
    SAVE_PROFILE_PHOTO_DATA,
    SAVE_QUOTE_OR_MOTTO_DATA,
    SAVE_SUMMARY_DATA,
    SET_CITY_AND_STATE_TO_OFFICE,
    SOCIAL_MEDIA_STEP,
} from './../constants/applicationCompany';

import {logOut} from './../actions/authorization';
import {
    fetchLinkedInDataFailed,
    fetchLinkedInDataSucceeded,
    fillInProfileFailed,
    fillInProfileSucceeded,
    importCompleted,
    persistTempOffices,
    saveSummaryDataFailed,
    saveSummaryDataSucceeded,
} from './../actions/applicationCompany';

import {getApplicationCompany, getTempOffices, getUploadedPhotos,} from './../reducers/applicationCompany';
import {getAccessToken,} from './../reducers/authorization';

const updateCompany = ({ id, accessToken, body }) =>
     axios({
         method: 'PUT',
         baseURL: API_URL,
         url: `${API_COMPANY_ROOT}/current`,
         data: body,
         responseType: 'json',
     }).then(response => response.data)
;
const fetchCompany = () =>
     axios.get(`${API_URL}${API_COMPANY_ROOT}/current`)
        .then(response => response.data)
;

const fetchProfile = () =>
     axios.get(`${API_URL}${API_RECRUITER_ROOT}/current`)
        .then(response => response.data)
;

export default function () {
    return [
        takeLatest(SAVE_SUMMARY_DATA, function* () {
            const { companyId, accessToken } = yield select(getAccessToken);
            const { summary } = yield select(getApplicationCompany);

            try {
                yield call(updateCompany, {
                    id: companyId,
                    accessToken,
                    body: {
                        name: summary.companyName,
                        employeesAmount: summary.numberOfEmployees.value,
                        type: summary.companyType,
                        foundDate: summary.foundationYear,
                    },
                });

                yield put(saveSummaryDataSucceeded({}));
            } catch (ex) {
                console.log('Summary saving fails', ex);
                yield put(saveSummaryDataFailed({}));
            }
        }),
        takeLatest(SAVE_PROFILE_PHOTO_DATA, function* (action) {
            const { companyId, accessToken } = yield select(getAccessToken);
            const { profilePhoto } = action.payload;
            try {
                yield call(updateCompany, {
                    id: companyId,
                    accessToken,
                    body: {
                        // TODO check mapping model on backend
                        logo: profilePhoto,
                    },
                });
            } catch (ex) {
                console.log('Profile photo unsaved', ex);
            }
        }),
        takeLatest([SAVE_COMPANY_PHOTO, REMOVE_COMPANY_PHOTO], function* () {
            const { companyId, accessToken } = yield select(getAccessToken);
            const uploadedPhotos = yield select(getUploadedPhotos);

            try {
                yield call(updateCompany, {
                    id: companyId,
                    accessToken,
                    body: {
                        images: uploadedPhotos
                            .map((item) => (item.mediaId)),
                    },
                });
            } catch (ex) {
                console.log('Company Application: Add Photos. Out of sync.', ex);
            }
        }),
        takeLatest(FETCH_LINKEDIN_DATA_REQUESTED, function* () {
            const { entityId } = yield select(getAccessToken);

            let profile;

            try {
                profile = yield call(fetchProfile, { id: entityId });
            } catch (ex) {
                return yield put(fetchLinkedInDataFailed());
            }

            if (!profile.hasOwnProperty('user') ||
                !profile.user.hasOwnProperty('linkedInData')) {
                return yield put(fetchLinkedInDataFailed());
            }
            const { linkedInData } = profile.user;

            yield put(fetchLinkedInDataSucceeded({
                // TODO partnership with LinkedIn to get more data
            }));
            yield put(importCompleted());
        }),
        takeLatest(SAVE_LOCATION_DATA, function* () {
            const { companyId, accessToken } = yield select(getAccessToken);
            const companyApp = yield select(getApplicationCompany);
            const headOffice = companyApp.location
                .slice(0, 1)
                .pop();
            const offices = companyApp.location
                .slice(1)

            const patch = {
                id: companyId,
                accessToken,
                body: {
                    locationHeadquarters,
                    locationOffices: offices
                        .map((item) =>
                             ({
                                 location: item.location
                             })
                        ),
                },
            };

            try {
                yield call(updateCompany, patch);
            } catch (ex) {
                console.log('Company Application: Add Location. Out of sync.', ex);
            }
        }),
        takeLatest(SAVE_DESCRIPTION_DATA, function* () {
            const { companyId, accessToken } = yield select(getAccessToken);
            const companyApp = yield select(getApplicationCompany);

            const patch = {
                id: companyId,
                accessToken,
                body: {
                    description: companyApp.description,
                },
            };

            try {
                yield call(updateCompany, patch);
            } catch (ex) {
                console.log('Company Application: Add Description. Out of sync.', ex);
            }
        }),
        takeLatest(SAVE_QUOTE_OR_MOTTO_DATA, function* () {
            const { companyId, accessToken } = yield select(getAccessToken);
            const companyApp = yield select(getApplicationCompany);

            const patch = {
                id: companyId,
                accessToken,
                body: {
                    quoteOrMotto: companyApp.quoteOrMotto,
                },
            };

            try {
                yield call(updateCompany, patch);
            } catch (ex) {
                console.log('Company Application: Add Quote. Out of sync.', ex);
            }
        }),
        takeLatest(SAVE_PHOTO_STEP, function* () {
            const { companyId, accessToken } = yield select(getAccessToken);
            const companyApp = yield select(getApplicationCompany);

            const patch = {
                id: companyId,
                accessToken,
                body: {
                    images: companyApp.photos
                        .map((item) => (item.mediaId)),
                },
            };

            try {
                yield call(updateCompany, patch);
            } catch (ex) {
                console.log('Company Application: Add Photos. Out of sync.', ex);
            }
        }),
        takeLatest(SET_CITY_AND_STATE_TO_OFFICE, function* (action) {
            const { id, location } = action.payload;

            yield put({
                type: 'redux-form/CHANGE',
                field: 'location',
                value: location,
                touch: true,
                form: id,
            });
            const newOffices = yield select((location) => {
                const tempOffices = getTempOffices(location);
                const reduxForms = location.form;

                return tempOffices.map((item) => {
                    const currentReduxForm = getValues(reduxForms[item.id]);
                    const { location } = currentReduxForm || {};

                    return {
                        ...item,
												location,
                    };
                });
            });

            yield put(persistTempOffices({ offices: newOffices }));
        }),
        takeLatest(GET_LATEST_PROFILE, function* () {
            // const { entityId } = yield select(getAccessToken);


            console.log('getting latest company profile')

            let profile, company;

            try {
                profile = yield call(fetchProfile);
                company = yield call(fetchCompany);

            } catch (ex) {
                throw ex;
                console.log("failed to make profile",err)
                return yield fillInProfileFailed({});
            }
            const progress = [];
            const {
                name,
                type,
                logo,
                foundDate,
                employeesAmount,
                description,
                quoteOrMotto,
                images,
            } = company;

            const {
                facebookUrl,
                linkedInUrl,
                twitterAcc,
                websiteUrl,
            } = company.socialMedia || {};

            const location = [
                company.locationHeadquarters,
                ...company.locationOffices,
            ]
                .slice(0)
                .map((item) => ({
									location
                }));

            const patch = {
                progress,
                summary: {
                    companyName: name,
                    foundationYear: foundDate,
                    numberOfEmployees: {
                        id: null,
                        value: employeesAmount,
                    },
                    companyType:  type,
                    email: profile.user.email,
                },
                location,
                description,
                quoteOrMotto,
                photos: images,
            };

            if (logo) {
                patch.profilePhoto = logo;
                progress.push(PROFILE_PHOTO_STEP);
            }

            if (linkedInUrl || facebookUrl || websiteUrl || twitterAcc) {
                patch.socialMedia = {
                    websiteUrl,
                    linkedInProfileUrl: linkedInUrl,
                    twitterUsername: twitterAcc,
                    facebookProfileUrl: facebookUrl,
                };
                progress.push(SOCIAL_MEDIA_STEP);
            }

            if (description) {
                patch.description = description;
                progress.push(DESCRIPTION_STEP);
            }

            if (quoteOrMotto) {
                patch.quoteOrMotto = quoteOrMotto;
                progress.push(QUOTE_OR_MOTTO_STEP);
            }
            yield put(fillInProfileSucceeded(patch));
        }),
        takeLatest([
            FILL_IN_PROFILE_FAILED,
        ], function* () {
            yield fork(logOut());
        }),
    ];
}
