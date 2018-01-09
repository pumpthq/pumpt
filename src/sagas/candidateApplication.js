import axios from 'axios'
import { takeLatest } from 'redux-saga'
import { call, take, put, select } from 'redux-saga/effects'
import {
    SAVE_SUMMARY_DATA,
    SAVE_EXPERIENCE_DATA,
    SAVE_EDUCATION_DATA,
    SAVE_INTERESTS_DATA,
    SAVE_SKILLS_DATA,
    SAVE_LOCATION_DATA,
    SAVE_SOCIAL_MEDIA_DATA,
    FETCH_LINKEDIN_DATA_REQUESTED,
    SAVE_PROFILE_PHOTO_DATA,
    GET_LATEST_PROFILE,
    PROFILE_PHOTO_STEP,
    EXPERIENCE_STEP,
    EDUCATION_STEP,
    LOCATION_STEP,
    SOCIAL_MEDIA_STEP,
    SHOW_ACCORDION
} from './../constants/applicationCandidate'
import {
    API_URL,
    API_CANDIDATE_ROOT,
    API_SCHOOLS_ENUMS,
    API_UNIVERSITY_ENUMS
} from './../constants/api'
import {
    getApplicationCandidate
} from './../reducers/applicationCandidate'
import {
    AUTHENTICATION_CANDIDATE_SUCCEEDED
} from './../constants/authorization'
import {
    getAccessToken
} from './../reducers/authorization'
import {
    saveSummaryDataSucceeded,
    saveSummaryDataFailed,

    fetchLinkedInDataFailed,
    fetchLinkedInDataSucceeded,

    importCompleted,
    fillInProfile
} from './../actions/applicationCandidate'

import {
    findById as findDropdownItemById,
    findSequence
} from '../constants/dropdownData'
import {
    FIELD_OF_EXPERTISE_DROPDOWN_DATA,
    JOB_TITLE_DROPDOWN_DATA
} from './../constants/candidateOnboarding'
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

export default function() {
    return [
        takeLatest(SAVE_SUMMARY_DATA, function * () {
            const { entityId, accessToken } = yield select(getAccessToken)
            const { summary } = yield select(getApplicationCandidate)
            const {
                fieldOfExpertise,
                jobTitle
            } = summary

            const patch = {
                id : entityId,
                accessToken,
                body : {
                    firstName : summary.firstName,
                    lastName : summary.lastName,
                    interestWorkingArea : summary.industry.value,
                    recentWorkingAreas : fieldOfExpertise,
                    recentJob : jobTitle.value,
                    recentAnnualIncome : summary.income.value,
                    recentAreaExperience : summary.experience.value
                }
            }

            try {
                yield call(updateCandidate, patch)

                yield put(saveSummaryDataSucceeded({}))
            } catch (ex) {
                console.log('Summary saving fails', ex)
                yield put(saveSummaryDataFailed({}))
            }
        }),
        takeLatest(SAVE_EXPERIENCE_DATA, function * () {
            const { entityId, accessToken } = yield select(getAccessToken)
            const {
                experience : {
                    companyName,
                    title,
                    location : {
                        place
                    },
                    fromDate,
                    toDate,
                    workHere,
                    description
                }
            } = yield select(getApplicationCandidate)

            const patch = {
                id : entityId,
                accessToken,
                body : {
                    workingExperience : {
                        companyName,
                        position : title,
                        location : place,
                        startWorkingAt : fromDate,
                        endWorkingAt : toDate,
                        isCurrentJob : workHere,
                        duty : description
                    }
                }
            }

            try {
                yield call(updateCandidate, patch)
            } catch (ex) {
                console.log('Candidate Application: Add Experience. Out of sync.', ex)
            }
        }),
        takeLatest(SAVE_EDUCATION_DATA, function * () {
            const { entityId, accessToken } = yield select(getAccessToken)
            const {
                education : {
                    schoolName,
                    fieldOfStudy,
                    degree,
                    fromDate,
                    toDate
                }
            } = yield select(getApplicationCandidate)

            const patch = {
                id : entityId,
                accessToken,
                body : {
                    education : {
                        schoolName,
                        specialty : fieldOfStudy,
                        startStudyAt : fromDate,
                        endStudyAt : toDate,
                        degree : degree
                    }
                }
            }

            try {
                yield call(updateCandidate, patch)
            } catch (ex) {
                console.log('Candidate Application: Add Education. Out of sync.', ex)
            }
        }),
        takeLatest(SAVE_LOCATION_DATA, function * () {
            const { entityId, accessToken } = yield select(getAccessToken)
            const candidateApp = yield select(getApplicationCandidate)

            const patch = {
                id : entityId,
                accessToken,
                body : {
									location,
									canRelocate
								}
            };

            try {
                yield call(updateCandidate, patch)
            } catch (ex) {
                console.log('Candidate Application: Add Location. Out of sync.', ex)
            }
        }),
        takeLatest(SAVE_SOCIAL_MEDIA_DATA, function * () {
            const { entityId, accessToken } = yield select(getAccessToken)
            const {
                socialMedia : {
                    linkedInProfileUrl,
                    twitterUsername,
                    facebookProfileUrl
                }
            } = yield select(getApplicationCandidate)

            const patch = {
                id : entityId,
                accessToken,
                body : {
                    socialMedia : {
                        linkedInUrl : linkedInProfileUrl,
                        twitterAcc : twitterUsername,
                        faceBookUrl : facebookProfileUrl
                    }
                }
            }

            try {
                yield call(updateCandidate, patch)
            } catch (ex) {
                console.log('Candidate Application: Add Social Media. Out of sync.', ex)
            }
        }),
        takeLatest(SAVE_SKILLS_DATA, function * () {
            const { entityId, accessToken } = yield select(getAccessToken)
            const {
                skills
            } = yield select(getApplicationCandidate)

            const skillsArray = []
            skills.filter(function(item) {
                if(item.value){
                    return skillsArray.push(item.title)
                }
            })
            const patch = {
                id : entityId,
                accessToken,
                body : {
                    skills : skillsArray
                }
            }

            try {
                yield call(updateCandidate, patch)
            } catch (ex) {
                console.log('Candidate Application: Add Skills. Out of sync.', ex)
            }
        }),
        takeLatest(SAVE_INTERESTS_DATA, function * () {
            const { entityId, accessToken } = yield select(getAccessToken)
            // TODO complete it
        }),
        takeLatest(FETCH_LINKEDIN_DATA_REQUESTED, function * () {
            const { entityId } = yield select(getAccessToken)

            let profile

            try {
                profile = yield call(fetchProfile, { id : entityId })
            } catch (ex) {
                yield put(fetchLinkedInDataFailed())
            }

            if (!profile.hasOwnProperty('user') ||
                !profile.user.hasOwnProperty('linkedInData')) {
                return yield put(fetchLinkedInDataFailed())
            }
            const { linkedInData } = profile.user

            yield put(fetchLinkedInDataSucceeded({
                experience : linkedInData.experience,
                education : linkedInData.education,
                // TODO for backend, we need partnership with LinkedIn to get more data about profile
                // skills : linkedInData.skills
            }))
            yield put(importCompleted())
        }),
        takeLatest(SAVE_PROFILE_PHOTO_DATA, function * (action) {
            const { entityId, accessToken } = yield select(getAccessToken)
            const { profilePhoto } = action.payload

            try {
                yield call(updateCandidate, {
                    id : entityId,
                    accessToken,
                    body : {
                        avatar : profilePhoto
                    }
                })
            } catch (ex) {
                console.log('Profile photo unsaved', ex)
            }
        }),
        takeLatest(GET_LATEST_PROFILE, function * () {
            const { entityId } = yield select(getAccessToken)

            let profile

            try {
                profile = yield call(fetchProfile, { id : entityId })
                const progress = []
                const {
                    avatar
                } = profile
                const {
                    location 
                } = profile
              const fieldOfExpertisePaths = profile.recentWorkingAreas
                .map(({parent, value}) => { 
                  findSequence({
                    path : [parent, value].filter((item) => (item)),
                    nestedListing : FIELD_OF_EXPERTISE_DROPDOWN_DATA
                  })
                })
                const jobTitlePath = findSequence({
                    path : [profile.recentJobParent, profile.recentJob]
                        .filter((item) => (item)),
                    nestedListing : JOB_TITLE_DROPDOWN_DATA
                })
                const {
                    workingExperience : {
                        companyName,
                        position,
                        jobLocation,
                        startWorkingAt,
                        endWorkingAt,
                        isCurrentJob,
                        duty
                    }
                } = profile
                const {
                    education
                } = profile

                const {
                   schoolName,
                   specialty,
                   startStudyAt,
                   endStudyAt,
                   degree
               } = education || {}
                const {
                    skills
                } = profile

                const patch = {
                    progress : progress,
                    accordion : null,
                    summary : {
                        firstName : profile.firstName,
                        lastName : profile.lastName,
                        industries : profile.interestWorkingArea,
                        income : {
                            id : null,
                            value : profile.recentAnnualIncome
                        },
                        experience : {
                            id : null,
                            value : profile.recentAreaExperience
                        }
                    }
                }

              if (fieldOfExpertisePaths.length > 0) {
                fieldOfExpertisePaths.forEach( path => {
                  const selectedItem = path.pop()
                  const parentItem = path.shift()

                  patch.summary.fieldOfExpertise.push({
                    id : selectedItem.id,
                    value:  selectedItem.title,
                    parent : {
                      id : parentItem.id,
                      value : parentItem.title
                    }
                  })
                })
              }

                if (jobTitlePath) {
                    const selectedItem = jobTitlePath.pop()

                    patch.summary.jobTitle = {
                        id : selectedItem.id,
                        value : profile.recentJob
                    }
                }
                if(avatar) {
                    patch.profilePhoto = profile.avatar
                    progress.push(PROFILE_PHOTO_STEP)
                }
                if (companyName) {
                    patch.experience = {
                        companyName,
                        title : position,
                        location : {
                            place : location
                        },
                        fromDate : moment(startWorkingAt, 'YYYY-MM'),
                        toDate : moment(endWorkingAt, 'YYYY-MM'),
                        workHere : isCurrentJob,
                        description : duty
                    }
                    progress.push(EXPERIENCE_STEP)
                }

                if (schoolName) {
                    patch.education = {
                        schoolName,
                        fieldOfStudy : specialty,
                        fromDate : moment(startStudyAt, 'YYYY-MM'),
                        toDate : moment(endStudyAt, 'YYYY-MM'),
                        degree
                    }
                    progress.push(EDUCATION_STEP)
                }
                // TODO
                // if (skills){
                //     const parsedSkills = []
                //     skills.forEach(skill, function() {
                //         parsedSkills.push({
                //             title : skill,
                //             value : true,
                //             alternative : false,
                //             items : false
                //         })
                //     })
                //     patch.skills = {
                //         parsedSkills
                //     }
                //     progress.push(SOCIAL_MEDIA_STEP)
                // }

                // if (linkedInUrl && twitterAcc && faceBookUrl) {
                //     patch.socialMedia = {
                //         linkedInProfileUrl : linkedInUrl,
                //         twitterUsername : twitterAcc,
                //         facebookProfileUrl : faceBookUrl
                //     }
                //     progress.push(SOCIAL_MEDIA_STEP)
                // }

                if (progress.length) {
                    patch.accordion = SHOW_ACCORDION
                }
                yield put(fillInProfile(patch))
            } catch (ex) {
                console.log('Sync after login fails',  ex)
            }
        })
    ]
}
