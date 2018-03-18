import axios from 'axios'
import {takeLatest} from 'redux-saga'
import {call, fork, put, select, take} from 'redux-saga/effects'

import {
    APPLY_FOR_MEMBERSHIP_REQUESTED,
    EMAIL_VALIDATE_REQUESTED,
    THIS_EMAIL_IS_ALREADY_REGISTERED
} from './../constants/candidateOnboarding'
import {API_CANDIDATE_ROOT, API_URL, EMAIL_AVAILABILITY,} from './../constants/api'
import {AUTHENTICATION_SUCCEEDED} from './../constants/authorization'
import {
    applyForMembershipFailed,
    applyForMembershipSucceeded,
    emailAlreadyRegistered,
    emailValidateSucceeded
} from './../actions/candidateOnboarding'
import {migrateOnboardingToApplication} from './../actions/applicationCandidate'
import {login, signInCandidate,} from './../actions/authorization'
import {getCandidateOnboarding} from './../reducers/candidateOnboarding'
import {getSummary} from './../reducers/applicationCandidate'
import {push} from 'react-router-redux'
import {ROUTE_APPLICATION_CANDIDATE} from './../constants/routes'
import {cityToGeocode} from './../utils/converters'

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
            const {resolve, reject} = action.payload
            const onboardingState = yield select(getCandidateOnboarding)
            let lat, lng;
            try {
              let coordinates = yield call(cityToGeocode,onboardingState.location);
              lat = coordinates.lat;
              lng = coordinates.lng;
            } catch (err) {
              console.log("Error finding lat/lng:");
              console.log(err);
            }

            const payload = {
                user : {
                    email : onboardingState.email,
                    password : onboardingState.password
                },
                firstName : onboardingState.firstName,
                lastName : onboardingState.lastName,
								location : onboardingState.location,
                locationCoordinates : {lat,lng},
								abilityToRelocate : onboardingState.abilityToRelocate,
                interestWorkingArea : onboardingState.industries.map(({value}) => value ),
                recentWorkingAreas : onboardingState.fieldOfExpertise.map(({value, parent: {value: parent}}) => ({value, parent})),
                recentJob : onboardingState.jobTitle.value,
                recentAnnualIncome : onboardingState.income.value,
                recentAreaExperience : onboardingState.experience.value,
								preferredCompanySize : onboardingState.preferredCompanySize.value,
                values : onboardingState.values.map(({value}) => value ),
                socialMedia: onboardingState.socialMedia
            }

            try {
                yield call(registerMembership, payload)
                resolve()
            } catch (ex) {
                reject(ex.data)
            }

            try {
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
