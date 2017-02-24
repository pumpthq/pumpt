import axios from 'axios';
import { takeLatest } from 'redux-saga';
import { call, fork, put, take, select } from 'redux-saga/effects';
import {
    EMAIL_VALIDATE_REQUESTED,
    APPLY_FOR_MEMBERSHIP_REQUESTED,
    THIS_EMAIL_IS_ALREADY_REGISTERED,
} from './../constants/companyOnboarding';
import {
    API_URL,
    API_RECRUITER_ROOT,
    EMAIL_AVAILABILITY,
    API_CITIES_ENUMS,
    API_COMPANY_ROOT,
} from './../constants/api';
import {
    AUTHENTICATION_SUCCEEDED,
} from './../constants/authorization';
import { push } from 'react-router-redux';
import {
    emailValidateSucceeded,
    emailAlreadyRegistered,
    applyForMembershipSucceeded,
    applyForMembershipFailed,
    showContactInfoStep,
} from './../actions/companyOnboarding';
import { getCompanyOnboarding } from './../reducers/companyOnboarding';
import { migrateOnboardingToApplication } from './../actions/applicationCompany';
import { getSummary } from './../reducers/applicationCompany';
import { signIn } from './../actions/authorization';
import states from './../constants/states.json';
import { ROUTE_APPLICATION_COMPANY } from './../constants/routes';

import { formatUrl } from './../utils'

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
        takeLatest(APPLY_FOR_MEMBERSHIP_REQUESTED, function* () {
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
                    type: onboardingState.companyType.value,
                    employeesAmount: onboardingState.numberOfEmployees.value,
                    locationHeadquarters: {
                        city: onboardingState.headquatersCity,
                        state: states[onboardingState.headquatersState],
                    },
                    socialMedia: {
                        websiteUrl: websiteUrl,
                        linkedInUrl: linkedInProfileUrl,
                        twitterAcc: `${onboardingState.twitterUsername}`,
                        facebookUrl: facebookProfileUrl,
                    },
                },
            };
            try {
                yield call(registerMembership, payload);
                yield put(migrateOnboardingToApplication(onboardingState));
                const { email, password } = yield select(getSummary);
                yield put(signIn({ email, password }));
                yield take(AUTHENTICATION_SUCCEEDED);
                yield put(push(ROUTE_APPLICATION_COMPANY));
                yield put(applyForMembershipSucceeded({}));
            } catch (ex) {
                yield put(applyForMembershipFailed({}));
            }
        }),
    ];
}
