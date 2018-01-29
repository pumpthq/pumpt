import {
    APPLY_FOR_MEMBERSHIP_FAILED,
    APPLY_FOR_MEMBERSHIP_REQUESTED,
    APPLY_FOR_MEMBERSHIP_SUCCEEDED,
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
