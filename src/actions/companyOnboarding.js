import {
    APPLY_FOR_MEMBERSHIP_FAILED,
    APPLY_FOR_MEMBERSHIP_REQUESTED,
    APPLY_FOR_MEMBERSHIP_SUCCEEDED,
    EMAIL_ALREADY_REGISTERED,
    EMAIL_VALIDATE_REQUESTED,
    EMAIL_VALIDATE_SUCCEEDED,
    SAVE_COMPANY_TYPE_DATA,
    SAVE_CONTACT_INFO_DATA,
    SAVE_FOUNDATION_YEAR_DATA,
    SAVE_HEADQUARTERS_LOCATION_DATA,
    SAVE_NUMBER_OF_EMPLOYEES_DATA,
    SAVE_SET_UP_PASSWORD_DATA,
    SAVE_VALUES_DATA,
    SAVE_WEBSITE_AND_SOCIAL_MEDIA_DATA,
    SHOW_COMPANY_TYPE_STEP,
    SHOW_CONTACT_INFO_STEP,
    SHOW_FOUNDATION_YEAR_STEP,
    SHOW_HEADQUARTERS_LOCATION_STEP,
    SHOW_NUMBER_OF_EMPLOYEES_STEP,
    SHOW_SET_UP_PASSWORD_STEP,
    SHOW_VALUES_STEP,
    SHOW_WEBSITE_AND_SOCIAL_MEDIA_STEP,
} from './../constants/companyOnboarding';

import {push} from 'react-router-redux'

export const gotoStep = (step) => push('/onboarding/company/'+step)

export const gotoContactInfoStep = () => gotoStep(SHOW_CONTACT_INFO_STEP);

export const gotoCompanyTypeStep = () => gotoStep(SHOW_COMPANY_TYPE_STEP);

export const gotoHeadquartersLocationStep = () => gotoStep(SHOW_HEADQUARTERS_LOCATION_STEP);

export const gotoNumberOfEmployeesStep = () => gotoStep(SHOW_NUMBER_OF_EMPLOYEES_STEP);

export const gotoFoundationYearStep = () => gotoStep(SHOW_FOUNDATION_YEAR_STEP);

export const gotoWebsiteAndSocialMediaStep = () => gotoStep(SHOW_WEBSITE_AND_SOCIAL_MEDIA_STEP);

export const gotoValuesStep = () => gotoStep(SHOW_VALUES_STEP)

export const gotoSetUpPasswordStep = () => gotoStep(SHOW_SET_UP_PASSWORD_STEP);

export const showContactInfoStep = () => ({
    type: SHOW_CONTACT_INFO_STEP,
});

export const emailValidateRequested = (email) => ({
    type: EMAIL_VALIDATE_REQUESTED,
    payload: {
        email,
    },
});

export const emailAlreadyRegistered = (message) => ({
    type: EMAIL_ALREADY_REGISTERED,
    error: {
        message,
    },
});

export const emailValidateSucceeded = (email) => ({
    type: EMAIL_VALIDATE_SUCCEEDED,
    payload: {
        email,
    },
});

export const saveContactInfoData = ({ companyName, fullName, jobTitle, email }) => ({
    type: SAVE_CONTACT_INFO_DATA,
    payload: {
        companyName,
        fullName,
        jobTitle,
        email,
    },
});

export const showCompanyTypeStep = () => ({
    type: SHOW_COMPANY_TYPE_STEP,
});

export const saveCompanyTypeData = ({ companyType }) => ({
    type: SAVE_COMPANY_TYPE_DATA,
    payload: {
        companyType,
    },
});

export const showHeadquartersLocationStep = () => ({
    type: SHOW_HEADQUARTERS_LOCATION_STEP,
});

export const saveHeadquartersLocationStep = ({ headquartersLocation }) => ({
    type: SAVE_HEADQUARTERS_LOCATION_DATA,
    payload: {
        headquartersLocation,
    },
});

export const showNumberOfEmployeesStep = () => ({
    type: SHOW_NUMBER_OF_EMPLOYEES_STEP,
});

export const saveNumberOfEmployeesStep = ({ numberOfEmployees }) => ({
    type: SAVE_NUMBER_OF_EMPLOYEES_DATA,
    payload: {
        numberOfEmployees,
    },
});

export const showFoundationYearStep = () => ({
    type: SHOW_FOUNDATION_YEAR_STEP,
});

export const saveFoundationYearData = ({ foundationYear }) => ({
    type: SAVE_FOUNDATION_YEAR_DATA,
    payload: {
        foundationYear,
    },
});

export const showWebsiteAndSocialMediaStep = () => ({
    type: SHOW_WEBSITE_AND_SOCIAL_MEDIA_STEP,
});

export const saveWebsiteAndSocialMediaData = ({
    websiteUrl,
    linkedInProfileUrl,
    twitterUsername,
    facebookProfileUrl,
}) => ({
    type: SAVE_WEBSITE_AND_SOCIAL_MEDIA_DATA,
    payload: {
        websiteUrl,
        linkedInProfileUrl,
        twitterUsername,
        facebookProfileUrl,
    },
});

export const showValuesStep = () => ({
    type : SHOW_VALUES_STEP
})

export const saveValuesData = ({ values }) => ({
    type : SAVE_VALUES_DATA,
    payload : {
        values
    }
})


export const showSetUpPasswordStep = () => ({
    type: SHOW_SET_UP_PASSWORD_STEP,
});

export const saveSetUpPasswordData = ({ password }) => ({
    type: SAVE_SET_UP_PASSWORD_DATA,
    payload: {
        password,
    },
});

export const applyForMembership = (resolve,reject) => ({
    type: APPLY_FOR_MEMBERSHIP_REQUESTED,
    payload: {resolve, reject}
});

export const applyForMembershipSucceeded = (payload = {}) => ({
    type: APPLY_FOR_MEMBERSHIP_SUCCEEDED,
    payload,
});

export const applyForMembershipFailed = () => ({
    type: APPLY_FOR_MEMBERSHIP_FAILED,
});
