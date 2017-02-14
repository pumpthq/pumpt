import {
    ONBOARDING_TO_APPLICATION_MIGRATION,

    IMPORT_STARTED,
    IMPORT_COMPLETED,

    FETCH_LINKEDIN_DATA_REQUESTED,
    FETCH_LINKEDIN_DATA_SUCCEEDED,
    FETCH_LINKEDIN_DATA_FAILED,

    SAVE_SUMMARY_DATA,
    SAVE_SUMMARY_DATA_SUCCEEDED,
    SAVE_SUMMARY_DATA_FAILED,

    SHOW_ACCORDION,

    SAVE_PROFILE_PHOTO_DATA,

    SHOW_EXPERIENCE_STEP,
    SAVE_EXPERIENCE_DATA,
    CLOSE_EXPERIENCE_STEP,

    SHOW_EDUCATION_STEP,
    SAVE_EDUCATION_DATA,
    CLOSE_EDUCATION_STEP,

    SHOW_LOCATION_STEP,
    SAVE_LOCATION_DATA,
    CLOSE_LOCATION_STEP,

    SHOW_SOCIAL_MEDIA_STEP,
    SAVE_SOCIAL_MEDIA_DATA,
    CLOSE_SOCIAL_MEDIA_STEP,

    SHOW_SKILLS_STEP,
    SAVE_SKILLS_DATA,
    CLOSE_SKILLS_STEP,

    SHOW_INTERESTS_STEP,
    SAVE_INTERESTS_DATA,
    SAVE_INTERESTS_PHOTO,
    CLOSE_INTERESTS_STEP,

    GET_LATEST_PROFILE,
    FILL_IN_PROFILE,

    SET_DEFAULT_STATE
} from './../constants/applicationCandidate'

export const showAccordion = () => ({
    type : SHOW_ACCORDION
})

export const migrateOnboardingToApplication = (payload) => ({
    type : ONBOARDING_TO_APPLICATION_MIGRATION,
    payload
})

export const importStarted = () => ({
    type : IMPORT_STARTED
})

export const importCompleted = () => ({
    type : IMPORT_COMPLETED
})

export const fetchLinkedInData = () => ({
    type : FETCH_LINKEDIN_DATA_REQUESTED
})

export const fetchLinkedInDataSucceeded = (payload) => ({
    type : FETCH_LINKEDIN_DATA_SUCCEEDED,
    payload
})

export const fetchLinkedInDataFailed = () => ({
    type : FETCH_LINKEDIN_DATA_FAILED
})

export const saveSummaryData = ({
    firstName,
    lastName,
    email,
    industry,
    fieldOfExpertise,
    jobTitle,
    income,
    experience,
    avatar
}) => ({
    type : SAVE_SUMMARY_DATA,
    payload : {
        firstName,
        lastName,
        email,
        industry,
        fieldOfExpertise,
        jobTitle,
        income,
        experience,
        avatar
    }
})

export const saveSummaryDataSucceeded = ({}) => ({
    type : SAVE_SUMMARY_DATA_SUCCEEDED,
    payload : {}
})

export const saveSummaryDataFailed = ({}) => ({
    type : SAVE_SUMMARY_DATA_FAILED,
    payload : {}
})

export const saveProfilePhotoData = ({ profilePhoto }) => ({
    type : SAVE_PROFILE_PHOTO_DATA,
    payload : {
        profilePhoto
    }
})

export const showExperienceStep = () => ({
    type : SHOW_EXPERIENCE_STEP
})

export const saveExperienceData = ({ companyName, title, location, fromDate, toDate, workHere, description }) => ({
    type : SAVE_EXPERIENCE_DATA,
    payload : {
        companyName,
        title,
        location,
        fromDate,
        toDate,
        workHere,
        description
    }
})

export const cancelExperienceStep = () => ({
    type : CLOSE_EXPERIENCE_STEP
})

export const showEducationStep = () => ({
    type : SHOW_EDUCATION_STEP
})

export const saveEducationData = ({ schoolName, fieldOfStudy, degree, fromDate, toDate }) => ({
    type : SAVE_EDUCATION_DATA,
    payload : {
        schoolName,
        fieldOfStudy,
        degree,
        fromDate,
        toDate
    }
})

export const cancelEducationStep = () => ({
    type : CLOSE_EDUCATION_STEP
})

export const showLocationStep = () => ({
    type : SHOW_LOCATION_STEP
})

export const saveLocationData = ({ place, city, state, canRelocate }) => ({
    type : SAVE_LOCATION_DATA,
    payload : {
        place,
        city,
        state,
        canRelocate
    }
})

export const cancelLocationStep = ({ replace }) => ({
    type : CLOSE_LOCATION_STEP,
    payload : {

        replace
    }
})

export const showSocialMediaStep = () => ({
    type : SHOW_SOCIAL_MEDIA_STEP
})

export const saveSocialMediaData = ({ linkedInProfileUrl, twitterUsername, facebookProfileUrl }) => ({
    type : SAVE_SOCIAL_MEDIA_DATA,
    payload : {
        linkedInProfileUrl,
        twitterUsername,
        facebookProfileUrl
    }
})

export const cancelSocialMediaStep = ({ fields, replace }) => ({
    type : CLOSE_SOCIAL_MEDIA_STEP,
    payload : {
        fields,
        replace
    }
})

export const showSkillsStep = () => ({
    type : SHOW_SKILLS_STEP
})

export const saveSkillsData = ({ skills }) => ({
    type : SAVE_SKILLS_DATA,
    payload : {
        skills
    }
})

export const cancelSkillsStep = ({ skills, replace }) => ({
    type : CLOSE_SKILLS_STEP,
    payload : {
        skills,
        replace
    }
})

export const showInterestsStep = () => ({
    type : SHOW_INTERESTS_STEP
})

export const saveInterestsData = ({ interests }) => ({
    type : SAVE_INTERESTS_DATA,
    payload : {
        interests
    }
})

export const saveInterestsPhoto = ({ mediaId, description }) => ({
    type : SAVE_INTERESTS_PHOTO,
    payload : {
        mediaId,
        description
    }
})

export const cancelInterestsStep = () => ({
    type : CLOSE_INTERESTS_STEP
})

export const getLatestProfile = () => ({
    type : GET_LATEST_PROFILE
})

export const fillInProfile = (payload) => ({
    type : FILL_IN_PROFILE,
    payload
})

export const clearApplicationCandidateState = () => ({
    type : SET_DEFAULT_STATE
})
