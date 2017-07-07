import axios from 'axios'
import { takeLatest } from 'redux-saga'
import { call, fork, put, take, select } from 'redux-saga/effects'

import {
    EMAIL_VALIDATE_REQUESTED,
    APPLY_FOR_MEMBERSHIP_REQUESTED,
    APPLY_FOR_MEMBERSHIP_SUCCEEDED,
    THIS_EMAIL_IS_ALREADY_REGISTERED
} from './../constants/candidateOnboarding'
import {
    API_URL,
    API_CANDIDATE_ROOT,
    EMAIL_AVAILABILITY,
} from './../constants/api'
import {
    AUTHENTICATION_SUCCEEDED
} from './../constants/authorization'
import {
    emailValidateSucceeded,
    emailAlreadyRegistered,
    applyForMembershipSucceeded,
    applyForMembershipFailed,
    showContactInfoStep
} from './../actions/candidateOnboarding'
import {
    migrateOnboardingToApplication
} from './../actions/applicationCandidate'
import {
    login,
    signInCandidate,
} from './../actions/authorization'
import { saveSummaryData } from './../actions/applicationCandidate'
import {
    getCandidateOnboarding
} from './../reducers/candidateOnboarding'
import {
    getSummary
} from './../reducers/applicationCandidate'
import { push } from 'react-router-redux'
import { ROUTE_APPLICATION_CANDIDATE } from './../constants/routes'

export const fetchByEmail = (email) => {
    return axios.get(`${API_URL}${EMAIL_AVAILABILITY}/${email}`)
        .then(response => response.data)
}

const registerMembership = (data) => {
    return axios.post(`${API_URL}${API_CANDIDATE_ROOT}`, data)
        .then(response => response.data)
}

export default function() {
    return [
        takeLatest(EMAIL_VALIDATE_REQUESTED, function * (action) {
            const { email } = action.payload

            try {
                const user = yield fork(fetchByEmail, email);

                if (user.email) throw new Error(THIS_EMAIL_IS_ALREADY_REGISTERED)
                yield put(emailValidateSucceeded())
            } catch (ex) {
                yield put(emailAlreadyRegistered(ex.message))
            }
        }),
        takeLatest(APPLY_FOR_MEMBERSHIP_REQUESTED, function * (action) {
            const onboardingState = yield select(getCandidateOnboarding)
            const payload = {
                user : {
                    email : onboardingState.email,
                    password : onboardingState.password
                },
                firstName : onboardingState.firstName,
                lastName : onboardingState.lastName,
								location : onboardingState.location,
								abilityToRelocate : onboardingState.abilityToRelocate,
                interestWorkingArea : onboardingState.industry.value,
                recentWorkingArea : onboardingState.fieldOfExpertise.value,
                recentWorkingAreaParent : onboardingState.fieldOfExpertiseHead.value,
                recentJob : onboardingState.jobTitle.value,
                recentAnnualIncome : onboardingState.income.value,
                recentAreaExperience : onboardingState.experience.value,
								preferredCompanySize : onboardingState.preferredCompanySize.value,
                values : onboardingState.values
            }

            try {
							console.log("trying to register member!");
                yield call(registerMembership, payload)
                yield put(migrateOnboardingToApplication(onboardingState))

                const { email, password } = yield select(getSummary)

                yield put(login({ email, password }))
                yield take(AUTHENTICATION_SUCCEEDED)
                yield put(push(ROUTE_APPLICATION_CANDIDATE))
                yield put(applyForMembershipSucceeded({}))
            } catch (ex) {
                yield put(applyForMembershipFailed({}))
            }
        })
    ]
}
