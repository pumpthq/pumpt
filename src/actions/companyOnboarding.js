import {
    SHOW_CONTACT_INFO_STEP,
    EMAIL_VALIDATE_REQUESTED,
    EMAIL_ALREADY_REGISTERED,
    EMAIL_VALIDATE_SUCCEEDED,
    SAVE_CONTACT_INFO_DATA,

    SHOW_COMPANY_TYPE_STEP,
    SAVE_COMPANY_TYPE_DATA,

    SHOW_HEADQUARTERS_LOCATION_STEP,
    SAVE_HEADQUARTERS_LOCATION_DATA,

    SHOW_NUMBER_OF_EMPLOYEES_STEP,
    SAVE_NUMBER_OF_EMPLOYEES_DATA,

    SHOW_FOUNDATION_YEAR_STEP,
    SAVE_FOUNDATION_YEAR_DATA,

    SHOW_WEBSITE_AND_SOCIAL_MEDIA_STEP,
    SAVE_WEBSITE_AND_SOCIAL_MEDIA_DATA,

    SHOW_SET_UP_PASSWORD_STEP,
    SAVE_SET_UP_PASSWORD_DATA,

    SHOW_VALUES_STEP,
    SAVE_VALUES_DATA,

    APPLY_FOR_MEMBERSHIP_REQUESTED,
    APPLY_FOR_MEMBERSHIP_SUCCEEDED,
    APPLY_FOR_MEMBERSHIP_FAILED,
} from './../constants/companyOnboarding';

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

export const applyForMembership = () => ({
    type: APPLY_FOR_MEMBERSHIP_REQUESTED,
});

export const applyForMembershipSucceeded = (payload = {}) => ({
    type: APPLY_FOR_MEMBERSHIP_SUCCEEDED,
    payload,
});

export const applyForMembershipFailed = () => ({
    type: APPLY_FOR_MEMBERSHIP_FAILED,
});
