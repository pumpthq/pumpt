import {
    APPLY_FOR_MEMBERSHIP_FAILED,
    APPLY_FOR_MEMBERSHIP_REQUESTED,
    APPLY_FOR_MEMBERSHIP_SUCCEEDED,
    EMAIL_ALREADY_REGISTERED,
    EMAIL_VALIDATE_REQUESTED,
    EMAIL_VALIDATE_SUCCEEDED,
    SAVE_DEGREE_DATA,
    SAVE_COMPANY_SIZE_DATA,
    SAVE_CONTACT_INFO_DATA,
    SAVE_EXPERIENCE_DATA,
    SAVE_FIELD_OF_EXPERTISE_DATA,
    SAVE_INCOME_DATA,
    SAVE_INDUSTRY_DATA,
    SAVE_JOB_TITLE_DATA,
    SAVE_SET_UP_PASSWORD_DATA,
    SAVE_VALUES_DATA,
    SHOW_COMPANY_SIZE_STEP,
    SHOW_CONTACT_INFO_STEP,
    SHOW_EXPERIENCE_STEP,
    SHOW_FIELD_OF_EXPERTISE_STEP,
    SHOW_INCOME_STEP,
    SHOW_INDUSTRY_STEP,
    SHOW_JOB_TITLE_STEP,
    SHOW_SET_UP_PASSWORD_STEP,
    SHOW_VALUES_STEP,
    SHOW_DEGREE_STEP,
    SAVE_EMPLOYMENT_DATA,
    SHOW_EMPLOYMENT_DATA,
} from './../constants/candidateOnboarding'

import {push} from 'react-router-redux'

export const gotoStep = (step) => push('/onboarding/candidate/'+step)

export const gotoContactInfoStep = () => gotoStep(SHOW_CONTACT_INFO_STEP)

export const gotoDegreeStep = () => gotoStep(SHOW_DEGREE_STEP)

export const gotoEmploymentStep = () => gotoStep(SHOW_EMPLOYMENT_STEP)

export const gotoIndustryStep = () => gotoStep(SHOW_INDUSTRY_STEP)

export const gotoFieldOfExpertiseStep = () => gotoStep(SHOW_FIELD_OF_EXPERTISE_STEP)

export const gotoJobTitleStep = () => gotoStep(SHOW_JOB_TITLE_STEP)

export const gotoIncomeStep = () => gotoStep(SHOW_INCOME_STEP)

export const gotoExperienceStep = () => gotoStep(SHOW_EXPERIENCE_STEP)

export const gotoCompanySizeStep = () => gotoStep(SHOW_COMPANY_SIZE_STEP)

export const gotoValuesStep = () => gotoStep(SHOW_VALUES_STEP)

export const gotoSetUpPasswordStep = () => gotoStep(SHOW_SET_UP_PASSWORD_STEP)

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

export const saveContactInfoData = ({ firstName, lastName, email, location, abilityToRelocate, socialMedia }) => ({
    type : SAVE_CONTACT_INFO_DATA,
    payload : {
        firstName,
        lastName,
        email,
        location,
				abilityToRelocate,
        socialMedia,
    }
})

export const showEmploymentStep = () => ({
  type: SHOW_EMPLOYMENT_STEP
})

export const saveEmploymentData = ({ employmentTypes }) => ({
  type : SAVE_EMPLOYMENT_DATA,
  payload : { employmentTypes }
})

export const showDegreeStep = () => ({
  type: SHOW_DEGREE_STEP
})

export const saveDegreeData = ({ degree }) => ({
  type : SAVE_DEGREE_DATA,
  payload : { degree }
})

export const showIndustryStep = () => ({
    type : SHOW_INDUSTRY_STEP
})

export const saveIndustryData = ({ industries }) => ({
    type : SAVE_INDUSTRY_DATA,
    payload : {
        industries
    }
})

export const showFieldOfExpertiseStep = () => ({
    type : SHOW_FIELD_OF_EXPERTISE_STEP
})

export const saveFieldOfExpertiseStep = ({ fieldOfExpertise }) => ({
    type : SAVE_FIELD_OF_EXPERTISE_DATA,
    payload : {
        fieldOfExpertise
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

export const showCompanySizeStep = () => ({
    type : SHOW_COMPANY_SIZE_STEP
})

export const saveCompanySizeData = ({ preferredCompanySize }) => ({
    type : SAVE_COMPANY_SIZE_DATA,
    payload : {
        preferredCompanySize
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

export const applyForMembership = (resolve,reject) => ({
    type : APPLY_FOR_MEMBERSHIP_REQUESTED,
    payload: {resolve, reject}
})

export const applyForMembershipSucceeded = ({}) => ({
    type : APPLY_FOR_MEMBERSHIP_SUCCEEDED,
    payload : {}
})

export const applyForMembershipFailed = () => ({
    type : APPLY_FOR_MEMBERSHIP_FAILED
})
