import {
    APPLY_FOR_MEMBERSHIP_FAILED,
    APPLY_FOR_MEMBERSHIP_REQUESTED,
    APPLY_FOR_MEMBERSHIP_SUCCEEDED,
    SAVE_COMPANY_SIZE_DATA,
    SAVE_CONTACT_INFO_DATA,
    SAVE_EXPERIENCE_DATA,
    SAVE_FIELD_OF_EXPERTISE_DATA,
    SAVE_INCOME_DATA,
    SAVE_INDUSTRY_DATA,
    SAVE_DEGREE_DATA,
    SAVE_JOB_TITLE_DATA,
    SAVE_SET_UP_PASSWORD_DATA,
    SAVE_VALUES_DATA,
    SHOW_APPLICATION_STEP,
    SHOW_COMPANY_SIZE_STEP,
    SHOW_CONTACT_INFO_STEP,
    SHOW_EXPERIENCE_STEP,
    SHOW_FIELD_OF_EXPERTISE_STEP,
    SHOW_INCOME_STEP,
    SHOW_INDUSTRY_STEP,
    SHOW_DEGREE_STEP,
    SHOW_JOB_TITLE_STEP,
    SHOW_SET_UP_PASSWORD_STEP,
    SHOW_VALUES_STEP,
} from './../constants/candidateOnboarding';
import saveStep from './saveOnboardingStep';

const defaultState = {
    step: SHOW_CONTACT_INFO_STEP,
    progress: [],
    values : []
};

export default (state = defaultState, action) => {
    const { payload } = action;
    const step = action.type;

    switch (step) {
        case SHOW_CONTACT_INFO_STEP :
            return {
                ...state,
                step,
            };
        case SAVE_CONTACT_INFO_DATA :
            return saveStep({
                state,
                step: SHOW_CONTACT_INFO_STEP,
                payload,
            });

        case SHOW_DEGREE_STEP :
            return {
                ...state,
                step,
            };

        case SAVE_DEGREE_DATA :
            return saveStep({
                state,
                step: SHOW_DEGREE_STEP,
                payload,
            });

        case SHOW_INDUSTRY_STEP :
            return {
                ...state,
                step,
            };
        case SAVE_INDUSTRY_DATA :
            return saveStep({
                state,
                step: SHOW_INDUSTRY_STEP,
                payload,
            });

        case SHOW_FIELD_OF_EXPERTISE_STEP :
            return {
                ...state,
                step,
            };
        case SAVE_FIELD_OF_EXPERTISE_DATA :
            return saveStep({
                state,
                step: SHOW_FIELD_OF_EXPERTISE_STEP,
                payload,
            });

        case SHOW_JOB_TITLE_STEP :
            return {
                ...state,
                step,
            };
        case SAVE_JOB_TITLE_DATA :
            return saveStep({
                state,
                step: SHOW_JOB_TITLE_STEP,
                payload,
            });

        case SHOW_INCOME_STEP :
            return {
                ...state,
                step,
            };
        case SAVE_INCOME_DATA :
            return saveStep({
                state,
                step: SHOW_INCOME_STEP,
                payload,
            });

        case SHOW_EXPERIENCE_STEP :
            return {
                ...state,
                step,
            };
        case SAVE_EXPERIENCE_DATA :
            return saveStep({
                state,
                step: SHOW_EXPERIENCE_STEP,
                payload,
            });

        case SHOW_VALUES_STEP :
            return {
                ...state,
                step,
            };
        case SAVE_VALUES_DATA :
            return saveStep({
                state,
                step: SHOW_VALUES_STEP,
                payload,
            });
        case SHOW_COMPANY_SIZE_STEP :
            return {
                ...state,
                step,
            };
        case SAVE_COMPANY_SIZE_DATA :
            return saveStep({
                state,
                step: SHOW_COMPANY_SIZE_STEP,
                payload,
            });

        case SHOW_APPLICATION_STEP :
            return {
                ...state,
                step,
            };

        case SHOW_SET_UP_PASSWORD_STEP :
            return {
                ...state,
                step,
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

export const getCandidateOnboarding = (state) => (state.candidateOnboarding);
