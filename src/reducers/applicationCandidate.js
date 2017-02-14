import ShortID from 'shortid';
import {
    SHOW_SUMMARY_HEAD_STANDARD,
    SHOW_SUMMARY_HEAD_EDIT,

    ONBOARDING_TO_APPLICATION_MIGRATION,

    IMPORT_STARTED,
    IMPORT_COMPLETED,

    FETCH_LINKEDIN_DATA_SUCCEEDED,
    FETCH_LINKEDIN_DATA_FAILED,

    SAVE_SUMMARY_DATA,

    PROFILE_PHOTO_STEP,
    SAVE_PROFILE_PHOTO_DATA,

    SHOW_ACCORDION,

    EXPERIENCE_STEP,
    SHOW_EXPERIENCE_STEP,
    SAVE_EXPERIENCE_DATA,
    CLOSE_EXPERIENCE_STEP,

    EDUCATION_STEP,
    SHOW_EDUCATION_STEP,
    SAVE_EDUCATION_DATA,
    CLOSE_EDUCATION_STEP,

    LOCATION_STEP,
    SHOW_LOCATION_STEP,
    SAVE_LOCATION_DATA,
    CLOSE_LOCATION_STEP,

    SOCIAL_MEDIA_STEP,
    SHOW_SOCIAL_MEDIA_STEP,
    SAVE_SOCIAL_MEDIA_DATA,
    CLOSE_SOCIAL_MEDIA_STEP,

    SKILLS_STEP,
    SHOW_SKILLS_STEP,
    SAVE_SKILLS_DATA,
    CLOSE_SKILLS_STEP,

    INTERESTS_STEP,
    SHOW_INTERESTS_STEP,
    SAVE_INTERESTS_DATA,
    SAVE_INTERESTS_PHOTO,
    CLOSE_INTERESTS_STEP,

    FILL_IN_PROFILE,

    SET_DEFAULT_STATE,
} from './../constants/applicationCandidate';
import saveStep from './saveOnboardingStep';
import pushUnique from './../pushUnique';

const defaultState = {
    summaryHead: SHOW_SUMMARY_HEAD_STANDARD,
    importFromLinkedIn: null,
    accordion: null,
    step: null,
    progress: [],
    active: [],
    summary: {},
    experience: {},
    education: {},
    location: {},
    socialMedia: {},
    skills: [
        ...[
            'MS Office (Word, Excel, PPt)',
            'ComsCore',
            'Google Analytics',
            'IAB Certification',
            'SalesForce',
        ].map((title) => ({
            title,
            value: false,
            alternative: false,
            items: false,
        })), {
            placeholder: 'Other',
            value: false,
            alternative: true,
            items: false,
        }, {
            title: 'Ad-Serving Platforms',
            placeholder: 'Type of platform',
            value: false,
            alternative: true,
            items: [{
                isFocused: true,
            }],
        },
    ],
    interests: Array.apply(null, Array(3))
        .map(() => ({
            mediaId: ShortID.generate()
        })),
};

export default (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SHOW_SUMMARY_HEAD_STANDARD :
        case SHOW_SUMMARY_HEAD_EDIT :
            return {
                ...state,
                summaryHead: type,
            };
        case SAVE_SUMMARY_DATA :
            return {
                ...state,
                summaryHead: type,
                summary: payload,
            };

        case ONBOARDING_TO_APPLICATION_MIGRATION :
            return {
                ...defaultState,
                summary: payload,
            };

        case IMPORT_STARTED :
            return {
                ...state,
                importFromLinkedIn: type,
            };
        case IMPORT_COMPLETED :
            return {
                ...state,
                accordion: SHOW_ACCORDION,
                importFromLinkedIn: type,
            };
        case FETCH_LINKEDIN_DATA_FAILED :
            return {
                ...state,
                importFromLinkedIn: null,
            };

        case FETCH_LINKEDIN_DATA_SUCCEEDED :
            return (() => {
                const newFilledState = state.progress.slice();
                const linkedInData = {};

                if (Array.isArray(payload.experience) &&
                    payload.experience.length > 0) {
                    linkedInData.experience = payload.experience.pop();
                    pushUnique(EXPERIENCE_STEP, newFilledState);
                }
                if (Array.isArray(payload.education) &&
                    payload.education.length > 0) {
                    linkedInData.education = payload.education.pop();
                    pushUnique(EDUCATION_STEP, newFilledState);
                }
                if (Object.keys(payload.location || {}).length > 0) {
                    linkedInData.location = payload.location || {};
                    pushUnique(EDUCATION_STEP, newFilledState);
                }
                if (Object.keys(payload.socialMedia || {}).length > 0) {
                    linkedInData.socialMedia = payload.socialMedia || {};
                    pushUnique(SOCIAL_MEDIA_STEP, newFilledState);
                }
                if (Array.isArray(payload.skills) &&
                    payload.skills.length > 0) {
                    linkedInData.skills = {
                        ...state.skills,
                        // TODO for backend
                        // ...payload.skills
                    };
                }

                return {
                    ...state,
                    ...payload,
                    accordion: SHOW_ACCORDION,
                    progress: newFilledState,
                    ...linkedInData,
                };
            })();
        case SHOW_ACCORDION :
            return {
                ...state,
                accordion: type,
            };

        case SAVE_PROFILE_PHOTO_DATA :
            return saveStep({
                state,
                step: PROFILE_PHOTO_STEP,
                payload,
            });

        case SHOW_EXPERIENCE_STEP :
            return {
                ...state,
                step: type,
                active: [EXPERIENCE_STEP],
            };
        case SAVE_EXPERIENCE_DATA :
            return {
                ...saveStep({
                    state,
                    step: EXPERIENCE_STEP,
                    payload: {
                        experience: payload,
                    },
                }),
                active: [],
            };

        case SHOW_EDUCATION_STEP :
            return {
                ...state,
                step: type,
                active: [EDUCATION_STEP],
            };
        case SAVE_EDUCATION_DATA :
            return {
                ...saveStep({
                    state,
                    step: EDUCATION_STEP,
                    payload: {
                        education: payload,
                    },
                }),
                active: [],
            };

        case SHOW_LOCATION_STEP :
            return {
                ...state,
                step: type,
                active: [LOCATION_STEP],
            };
        case SAVE_LOCATION_DATA :
            return {
                ...saveStep({
                    state,
                    step: LOCATION_STEP,
                    payload: {
                        location: payload,
                    },
                }),
                active: [],
            };

        case SHOW_SOCIAL_MEDIA_STEP :
            return {
                ...state,
                step: type,
                active: [SOCIAL_MEDIA_STEP],
            };
        case SAVE_SOCIAL_MEDIA_DATA :
            return {
                ...saveStep({
                    state,
                    step: SOCIAL_MEDIA_STEP,
                    payload: {
                        socialMedia: payload,
                    },
                }),
                active: [],
            };

        case SHOW_SKILLS_STEP :
            return {
                ...state,
                step: type,
                active: [SKILLS_STEP],
            };
        case SAVE_SKILLS_DATA :
            return {
                ...saveStep({
                    state,
                    step: SKILLS_STEP,
                    payload: {
                        skills: payload.skills.map((item) => {
                            const inItems = item.items;

                            if (inItems) {
                                return {
                                    ...item,
                                    // TIP If ApplicationTypedCheckbox unchecked
                                    // then remove children
                                    items: item.value ? inItems.map((inItem) => ({
                                        ...inItem,
                                        isFocused: false,
                                    })) : [{}],
                                };
                            }

                            return {
                                ...item,
                            };
                        }),
                    },
                }),
                active: [],
            };

        case SHOW_INTERESTS_STEP :
            return {
                ...state,
                step: type,
                active: [INTERESTS_STEP],
            };
        case SAVE_INTERESTS_DATA :
            return {
                ...saveStep({
                    state,
                    step: INTERESTS_STEP,
                    payload: {
                        interests: payload.interests,
                    },
                }),
                active: [],
            };
        case SAVE_INTERESTS_PHOTO :
            return (() => {
                const copyOfInterests = state.interests.slice();
                const filteredInterest = copyOfInterests
                    .filter((element) => (element.mediaId === payload.mediaId)).pop();

                if (filteredInterest) {
                    filteredInterest.description = payload.description;
                } else {
                    copyOfInterests.push({
                        mediaId: payload.mediaId,
                        description: payload.description,
                    });
                }

                return {
                    ...state,
                    interests: copyOfInterests,
                    active: [INTERESTS_STEP],
                };
            })();

        case SET_DEFAULT_STATE :
            return defaultState;

        case CLOSE_LOCATION_STEP :
            return {
                ...state,
                step: null,
                active: [],
                progress: payload.replace ?
                    state.progress.filter((item) => item !== LOCATION_STEP) :
                    state.progress,
                location: payload.replace ? {} : payload.location,
            };
        case CLOSE_SOCIAL_MEDIA_STEP :
            return {
                ...state,
                step: null,
                active: [],
                progress: payload.replace ?
                    state.progress.filter((item) => item !== SOCIAL_MEDIA_STEP) :
                    state.progress,
                socialMedia: payload.replace ? {} : payload.socialMedia,
            };
        case CLOSE_SKILLS_STEP :
            return {
                ...state,
                step: null,
                active: [],
                progress: payload.replace ?
                    state.progress.filter((item) => item !== SKILLS_STEP) :
                    state.progress,
                skills: payload.skills,
            };
        case CLOSE_EXPERIENCE_STEP :
        case CLOSE_EDUCATION_STEP :
        case CLOSE_INTERESTS_STEP :
            return {
                ...state,
                step: null,
                active: [],
            };

        case FILL_IN_PROFILE :
            return {
                ...state,
                ...payload,
                step: null,
                active: [],
                filled: [],
            };

        default :
            return state;
    }
};

export const getInterests = (state) => (state.applicationCandidate.interests);

export const getSummary = (state) => (state.applicationCandidate.summary);

export const getApplicationCandidate = (state) => (state.applicationCandidate);
