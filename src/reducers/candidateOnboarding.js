import {
    SHOW_CONTACT_INFO_STEP,
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

    SHOW_COMPANY_SIZE_STEP,
    SAVE_COMPANY_SIZE_DATA,

		SHOW_APPLICATION_STEP,
		//SAVE...

    SHOW_SET_UP_PASSWORD_STEP,
    SAVE_SET_UP_PASSWORD_DATA,

    APPLY_FOR_MEMBERSHIP_REQUESTED,
    APPLY_FOR_MEMBERSHIP_SUCCEEDED,
    APPLY_FOR_MEMBERSHIP_FAILED,
} from './../constants/candidateOnboarding';
import saveStep from './saveOnboardingStep';

const defaultState = {
    step: SHOW_CONTACT_INFO_STEP,
    progress: [],
    valueAssessments : []
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
