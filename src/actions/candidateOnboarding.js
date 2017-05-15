import {
    SHOW_CONTACT_INFO_STEP,
    EMAIL_VALIDATE_REQUESTED,
    EMAIL_ALREADY_REGISTERED,
    EMAIL_VALIDATE_SUCCEEDED,
    SAVE_CONTACT_INFO_DATA,

    SHOW_INDUSTRY_STEP,
    SAVE_INDUSTRY_DATA,

    SHOW_FIELD_OF_EXPERTISE_STEP,
    SAVE_FIELD_OF_EXPERTISE_DATA,

    SHOW_JOB_TITLE_STEP,
    SAVE_JOB_TITLE_DATA,

    SHOW_INCOME_STEP,
    SAVE_INCOME_DATA,

    SHOW_EXPERIENCE_STEP,
    SAVE_EXPERIENCE_DATA,

    SHOW_VALUES_STEP,
    SAVE_VALUES_DATA,

		SHOW_APPLICATION_STEP,
		//SHOW_APPLICATION_DATA,

    SHOW_SET_UP_PASSWORD_STEP,
    SAVE_SET_UP_PASSWORD_DATA,

    APPLY_FOR_MEMBERSHIP_REQUESTED,
    APPLY_FOR_MEMBERSHIP_SUCCEEDED,
    APPLY_FOR_MEMBERSHIP_FAILED
} from './../constants/candidateOnboarding'

export const showContactInfoStep = () => ({
    type : SHOW_CONTACT_INFO_STEP
})

export const emailValidateRequested = (email) => ({
    type : EMAIL_VALIDATE_REQUESTED,
    payload : {
        email
    }
})

export const emailAlreadyRegistered = (message) => ({
    type : EMAIL_ALREADY_REGISTERED,
    error : {
        message
    }
})

export const emailValidateSucceeded = (email) => ({
    type : EMAIL_VALIDATE_SUCCEEDED,
    payload : {
        email
    }
})

export const saveContactInfoData = ({ firstName, lastName, email, location }) => ({
    type : SAVE_CONTACT_INFO_DATA,
    payload : {
        firstName,
        lastName,
        email,
        location,
    }
})

export const showIndustryStep = () => ({
    type : SHOW_INDUSTRY_STEP
})

export const saveIndustryData = ({ industry }) => ({
    type : SAVE_INDUSTRY_DATA,
    payload : {
        industry
    }
})

export const showFieldOfExpertiseStep = () => ({
    type : SHOW_FIELD_OF_EXPERTISE_STEP
})

export const saveFieldOfExpertiseStep = ({ fieldOfExpertise, fieldOfExpertiseHead }) => ({
    type : SAVE_FIELD_OF_EXPERTISE_DATA,
    payload : {
        fieldOfExpertise,
        fieldOfExpertiseHead
    }
})

export const showJobTitleStep = () => ({
    type : SHOW_JOB_TITLE_STEP
})

export const saveJobTitleStep = ({ jobTitle, jobTitleHead }) => ({
    type : SAVE_JOB_TITLE_DATA,
    payload : {
        jobTitle,
        jobTitleHead
    }
})

export const showIncomeStep = () => ({
    type : SHOW_INCOME_STEP
})

export const saveIncomeData = ({ income }) => ({
    type : SAVE_INCOME_DATA,
    payload : {
        income
    }
})

export const showExperienceStep = () => ({
    type : SHOW_EXPERIENCE_STEP
})

export const saveExperienceData = ({ experience }) => ({
    type : SAVE_EXPERIENCE_DATA,
    payload : {
        experience
    }
})

export const showValuesStep = () => ({
    type : SHOW_VALUES_STEP
})

export const saveValuesData = ({ values }) => ({
    type : SAVE_VALUES_DATA,
    payload : {
        values
    }
})

export const showApplicationStep = () => ({
    type : SHOW_APPLICATION_STEP
})

/*export const saveApplicationData = ({ values }) => ({
    type : SAVE_VALUES_DATA,
    payload : {
        values
    }
})*/

export const showSetUpPasswordStep = () => ({
    type : SHOW_SET_UP_PASSWORD_STEP
})

export const saveSetUpPasswordData = ({ password }) => ({
    type : SAVE_SET_UP_PASSWORD_DATA,
    payload : {
        password
    }
})

export const applyForMembership = () => ({
    type : APPLY_FOR_MEMBERSHIP_REQUESTED
})

export const applyForMembershipSucceeded = ({}) => ({
    type : APPLY_FOR_MEMBERSHIP_SUCCEEDED,
    payload : {}
})

export const applyForMembershipFailed = () => ({
    type : APPLY_FOR_MEMBERSHIP_FAILED
})
