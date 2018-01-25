import axios from 'axios';
import {takeLatest} from 'redux-saga';
import {call, fork, put, select, take} from 'redux-saga/effects';
import {
    APPLY_FOR_MEMBERSHIP_REQUESTED,
    EMAIL_VALIDATE_REQUESTED,
    THIS_EMAIL_IS_ALREADY_REGISTERED,
} from './../constants/companyOnboarding';
import {API_CITIES_ENUMS, API_COMPANY_ROOT, API_RECRUITER_ROOT, API_URL, EMAIL_AVAILABILITY,} from './../constants/api';
import {AUTHENTICATION_SUCCEEDED,} from './../constants/authorization';
import {push} from 'react-router-redux';
import {
    applyForMembershipFailed,
    applyForMembershipSucceeded,
    emailAlreadyRegistered,
    emailValidateSucceeded,
} from 'actions/companyOnboarding';
import {getCompanyOnboarding} from './../reducers/companyOnboarding';
import {migrateOnboardingToApplication} from './../actions/applicationCompany';
import {getSummary} from './../reducers/applicationCompany';
import {login} from './../actions/authorization';
import {ROUTE_APPLICATION_COMPANY} from './../constants/routes';

import {formatUrl} from './../utils'

export const fetchByEmail = (email) =>
     axios.get(`${API_URL}${EMAIL_AVAILABILITY}/${email}`)
        .then(response => response.data)
;

export const isAvailable = ({ companyName }) =>
     axios.get(`${API_URL}${API_COMPANY_ROOT}/is-available/${companyName}`)
        .then(response => response.data)
;

const registerMembership = (data) =>
     axios.post(`${API_URL}${API_RECRUITER_ROOT}`, data)
        .then(response => response.data)
;

export const fetchPlaces = (data) =>
     axios.get(`${API_URL}${API_CITIES_ENUMS}/${data}`)
        .then(response => response.data)
;

export default function () {
    return [
        takeLatest(EMAIL_VALIDATE_REQUESTED, function* (action) {
            const { email } = action.payload;

            try {
                const user = yield fork(fetchByEmail, email);

                if (user.email) {
                    throw new Error(THIS_EMAIL_IS_ALREADY_REGISTERED);
                }
                yield put(emailValidateSucceeded());
            } catch (ex) {
                yield put(emailAlreadyRegistered(ex.message));
            }
        }),
        takeLatest(APPLY_FOR_MEMBERSHIP_REQUESTED, function* (action) {
            const {resolve, reject} = action.payload

            const onboardingState = yield select(getCompanyOnboarding);

            if (!onboardingState.linkedInProfileUrl) {
                onboardingState.linkedInProfileUrl = '';
            }
            const linkedInProfileUrl = formatUrl(onboardingState.linkedInProfileUrl).url
            if (!onboardingState.twitterUsername) {
                onboardingState.twitterUsername = '';
            }
            if (!onboardingState.facebookProfileUrl) {
                onboardingState.facebookProfileUrl = '';
            }
            const facebookProfileUrl = formatUrl(onboardingState.facebookProfileUrl).url
            if(!onboardingState.websiteUrl) {
                onboardingState.websiteUrl = '';
            }
            const websiteUrl = formatUrl(onboardingState.websiteUrl).url

            const payload = {
                fullName: onboardingState.fullName,
                position: onboardingState.jobTitle,
                user: {
                    email: onboardingState.email,
                    password: onboardingState.password,
                },
                company: {
                    name: onboardingState.companyName,
                    foundDate: `${onboardingState.foundationYear}`,
                    type: onboardingState.companyType.map(({value}) => value ),
                    employeesAmount: onboardingState.numberOfEmployees.value,
                    headquartersLocation: onboardingState.headquartersLocation,
                    socialMedia: {
                        websiteUrl: websiteUrl,
                        linkedInUrl: linkedInProfileUrl,
                        twitterAcc: `${onboardingState.twitterUsername}`,
                        facebookUrl: facebookProfileUrl,
                    },
										values : onboardingState.values ? onboardingState.values.values :  ''
                },
            };
            try { //submitting membership registration request via api
                yield call(registerMembership, payload);
                resolve()
            } catch (ex) { //and pass it back to have the error displayed
                reject(ex.data)
            }

            try { //migrating data to application phase and logging to new membership
                yield put(migrateOnboardingToApplication(onboardingState));
                const { email, password } = yield select(getSummary);
                yield put(login({ email, password }));
                yield take(AUTHENTICATION_SUCCEEDED);
                yield put(push(ROUTE_APPLICATION_COMPANY));
                yield put(applyForMembershipSucceeded({}));
            } catch (ex) {
                console.error(ex)
                yield put(applyForMembershipFailed({}));
            }
        }),
    ];
}
