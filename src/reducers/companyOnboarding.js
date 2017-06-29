import {
    SHOW_CONTACT_INFO_STEP,
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

    SHOW_VALUES_STEP,
    SAVE_VALUES_DATA,

    SHOW_SET_UP_PASSWORD_STEP,
    SAVE_SET_UP_PASSWORD_DATA,

    APPLY_FOR_MEMBERSHIP_REQUESTED,
    APPLY_FOR_MEMBERSHIP_SUCCEEDED,
    APPLY_FOR_MEMBERSHIP_FAILED,
} from './../constants/companyOnboarding';
import saveStep from './saveOnboardingStep';

const defaultState = {
    step: SHOW_CONTACT_INFO_STEP,
    progress: [],
};

export default (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SHOW_CONTACT_INFO_STEP :
            return {
                ...state,
                step: type,
            };
        case SAVE_CONTACT_INFO_DATA :
            return saveStep({
                state,
                step: SHOW_CONTACT_INFO_STEP,
                payload,
            });

        case SHOW_COMPANY_TYPE_STEP :
            return {
                ...state,
                step: type,
            };
        case SAVE_COMPANY_TYPE_DATA :
            return saveStep({
                state,
                step: SHOW_COMPANY_TYPE_STEP,
                payload,
            });

        case SHOW_HEADQUARTERS_LOCATION_STEP :
            return {
                ...state,
                step: type,
            };
        case SAVE_HEADQUARTERS_LOCATION_DATA :
            return saveStep({
                state,
                step: SHOW_HEADQUARTERS_LOCATION_STEP,
                payload,
            });

        case SHOW_NUMBER_OF_EMPLOYEES_STEP :
            return {
                ...state,
                step: type,
            };
        case SAVE_NUMBER_OF_EMPLOYEES_DATA :
            return saveStep({
                state,
                step: SHOW_NUMBER_OF_EMPLOYEES_STEP,
                payload,
            });

        case SHOW_FOUNDATION_YEAR_STEP :
            return {
                ...state,
                step: type,
            };
        case SAVE_FOUNDATION_YEAR_DATA :
            return saveStep({
                state,
                step: SHOW_FOUNDATION_YEAR_STEP,
                payload,
            });

        case SHOW_WEBSITE_AND_SOCIAL_MEDIA_STEP :
            return {
                ...state,
                step: type,
            };
        case SAVE_WEBSITE_AND_SOCIAL_MEDIA_DATA :
            return saveStep({
                state,
                step: SHOW_WEBSITE_AND_SOCIAL_MEDIA_STEP,
                payload,
            });

        case SHOW_VALUES_STEP :
            return {
                ...state,
                step: type,
            };
        case SAVE_VALUES_DATA :
            return saveStep({
                state,
                step: SHOW_VALUES_STEP,
                payload,
            });

        case SHOW_SET_UP_PASSWORD_STEP :
            return {
                ...state,
                step: type,
            };
        case SAVE_SET_UP_PASSWORD_DATA :
            return saveStep({
                state,
                step: SHOW_SET_UP_PASSWORD_STEP,
                payload,
            });

        case APPLY_FOR_MEMBERSHIP_SUCCEEDED :
            return defaultState;

        case APPLY_FOR_MEMBERSHIP_REQUESTED :
        case APPLY_FOR_MEMBERSHIP_FAILED :
            return state;

        default :
            return state;
    }
};

export const getCompanyOnboarding = (state) => (state.companyOnboarding);
