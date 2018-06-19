import axios from 'axios'
import {takeLatest} from 'redux-saga'
import {call, put, select} from 'redux-saga/effects'
import {
    EDUCATION_STEP,
    EXPERIENCE_STEP,
    FETCH_LINKEDIN_DATA_REQUESTED,
    GET_LATEST_PROFILE,
    PROFILE_PHOTO_STEP,
    SAVE_EDUCATION_DATA,
    SAVE_EXPERIENCE_DATA,
    SAVE_INTERESTS_DATA,
    SAVE_LOCATION_DATA,
    SAVE_PROFILE_PHOTO_DATA,
    SAVE_SKILLS_DATA,
    SAVE_SOCIAL_MEDIA_DATA,
    SAVE_SUMMARY_DATA,
    SHOW_ACCORDION
} from './../constants/applicationCandidate'
import {API_CANDIDATE_ROOT, API_SCHOOLS_ENUMS, API_UNIVERSITY_ENUMS, API_URL} from './../constants/api'
import {getApplicationCandidate} from './../reducers/applicationCandidate'
import {getAccessToken} from './../reducers/authorization'
import {
    fetchLinkedInDataFailed,
    fetchLinkedInDataSucceeded,
    fillInProfile,
    importCompleted,
    saveSummaryDataFailed,
    saveSummaryDataSucceeded
} from './../actions/applicationCandidate'

import {findSequence} from '../constants/dropdownData'
import {FIELD_OF_EXPERTISE_DROPDOWN_DATA, JOB_TITLE_DROPDOWN_DATA} from './../constants/candidateOnboarding'
import moment from 'moment'

const updateCandidate = ({ id, accessToken, body }) => {
    return axios({
        method : 'PUT',
        baseURL : API_URL,
        url : `${API_CANDIDATE_ROOT}/current`,
        data : body,
        responseType : 'json'
    }).then(response => response.data)
}

const fetchProfile = ({ id }) => {
    return axios.get(`${API_URL}${API_CANDIDATE_ROOT}/current`)
        .then(response => response.data)
}

export const fetchSchools = (data) => {
    return axios.get(`${API_URL}${API_SCHOOLS_ENUMS}/${data}`)
        .then(response => response.data)
}

export const fetchUniversity = (data) => {
    return axios.get(`${API_URL}${API_UNIVERSITY_ENUMS}/${data}`)
        .then(response => response.data)
}
