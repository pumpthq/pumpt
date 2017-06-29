import deepCopy from 'deep-copy';
import ShortID from 'shortid';
import lodash from 'lodash';
import {
    ONBOARDING_TO_APPLICATION_MIGRATION,

    SHOW_SUMMARY_HEAD_STANDARD,
    SHOW_SUMMARY_HEAD_EDIT,

    IMPORT_STARTED,
    IMPORT_COMPLETED,

    FETCH_LINKEDIN_DATA_SUCCEEDED,
    FETCH_LINKEDIN_DATA_FAILED,

    SAVE_SUMMARY_DATA,

    SHOW_ACCORDION,

    PROFILE_PHOTO_STEP,
    SAVE_PROFILE_PHOTO_DATA,

    SOCIAL_MEDIA_STEP,
    SHOW_SOCIAL_MEDIA_STEP,
    SAVE_SOCIAL_MEDIA_DATA,
    CLOSE_SOCIAL_MEDIA_STEP,

    LOCATION_STEP,
    SHOW_LOCATION_STEP,
    SAVE_LOCATION_DATA,
    CLOSE_LOCATION_STEP,

    PERSIST_TEMP_OFFICES,

    DESCRIPTION_STEP,
    SHOW_DESCRIPTION_STEP,
    SAVE_DESCRIPTION_DATA,
    CLOSE_DESCRIPTION_STEP,

    QUOTE_OR_MOTTO_STEP,
    SHOW_QUOTE_OR_MOTTO_STEP,
    SAVE_QUOTE_OR_MOTTO_DATA,
    CLOSE_QUOTE_OR_MOTTO_STEP,

    PHOTO_STEP,
    SHOW_PHOTO_STEP,
    SAVE_COMPANY_PHOTO,
    REMOVE_COMPANY_PHOTO,
    CLOSE_PHOTO_STEP,

    SET_DEFAULT_STATE,

    FILL_IN_PROFILE_SUCCEEDED,
} from './../constants/applicationCompany';
import saveStep from './saveOnboardingStep';
import pushUnique from './../pushUnique';

const companyOfficePrefix = 'companyApplicationAddOffice';
const getOfficeComponentKey = () => ({
    componentKey: ShortID.generate(),
    id: `${companyOfficePrefix}-${ShortID.generate()}`,
});
const defaultState = {
    summaryHead: SHOW_SUMMARY_HEAD_STANDARD,
    importFromLinkedIn: null,
    accordion: SHOW_ACCORDION,
    step: null,
    progress: [
        SOCIAL_MEDIA_STEP,
        LOCATION_STEP,
    ],
    active: [],
    summary: {},
    photos: Array(...Array(3))
        .map(() => ({
            mediaId: ShortID.generate(),
        })),
    location: ['Headquarters', 'Offices']
        .map((title) => ({
            ...getOfficeComponentKey(),
            title,
            place: null,
        })),
    tempOffices: [],
    socialMedia: {},
};

const aggregatePhotos = ({ progress, photos }) => {
    const quantityOfPlaceholdersOnStartup = defaultState.photos.length;
    const photosWithoutPlaceholders = photos.filter((item) => (item.isUploaded));

    const isUploadedLimitPhotos = photos.length >= 3
    console.log(`Photos array`)
    console.log(photos)
    // console.log(progress)
    return {
        photos: photosWithoutPlaceholders.length >= quantityOfPlaceholdersOnStartup ? [
            ...photosWithoutPlaceholders,
            { mediaId: ShortID.generate() },
        ] : [
            ...photosWithoutPlaceholders,
            ...Array(...Array(quantityOfPlaceholdersOnStartup - photosWithoutPlaceholders.length))
                .map(() => ({
                    mediaId: ShortID.generate(),
                })),
        ],
        progress: isUploadedLimitPhotos ?
            pushUnique(PHOTO_STEP, [...progress]) :
            progress.filter((step) => (step !== PHOTO_STEP)),
    };
};

export default (state = defaultState, action) => {
    const { type, payload } = action;
    const photosInState = state.photos.slice();

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
        case SHOW_ACCORDION :
            return {
                ...state,
                accordion: type,
            };

        case ONBOARDING_TO_APPLICATION_MIGRATION :
            return {
                ...defaultState,
                // TODO: mapping summary
                summary: payload,
                location: deepCopy(defaultState.location)
                    .map((item, index) => {
                        if (index === 0) {
                            return {
                                ...item,
                                location: payload.headquartersLocation,
                            };
                        }

                        return item;
                    }),
                socialMedia: {
                    websiteUrl: payload.websiteUrl,
                    linkedInProfileUrl: payload.linkedInProfileUrl,
                    twitterUsername: payload.twitterUsername,
                    facebookProfileUrl: payload.facebookProfileUrl,
                },
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

                return {
                    ...state,
                    ...payload,
                    accordion: SHOW_ACCORDION,
                    progress: newFilledState,
                    ...linkedInData,
                };
            })();

        case SAVE_PROFILE_PHOTO_DATA :
            return saveStep({
                state,
                step: PROFILE_PHOTO_STEP,
                payload,
            });

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

        case SHOW_LOCATION_STEP :
            return {
                ...state,
                tempOffices: deepCopy(state.location),
                step: type,
                active: [LOCATION_STEP],
            };
        case SAVE_LOCATION_DATA :
            return {
                ...saveStep({
                    state,
                    step: LOCATION_STEP,
                    payload: {
                        location: deepCopy(state.tempOffices),
                        tempOffices: [],
                    },
                }),
                active: [],
            };
        case PERSIST_TEMP_OFFICES :
            return (() => {
                const quantityOfMandatory = 2;
                const incomingOffices = payload.offices
                    .filter((item) => (item.city && item.state));
                const mandatoryOffices = incomingOffices
                    .slice(0, quantityOfMandatory);
                const secondaryOffices = incomingOffices
                    .slice(quantityOfMandatory);

                if (mandatoryOffices.length < quantityOfMandatory) {
                    new Array(quantityOfMandatory - mandatoryOffices.length)
                        .forEach(() => {
                            mandatoryOffices.push({
                                ...getOfficeComponentKey(),
                                place: null,
                            });
                        });
                } else if (mandatoryOffices.length === 2) {
                    secondaryOffices.push({
                        ...getOfficeComponentKey(),
                        place: null,
                    });
                }

                const newOffices = [...mandatoryOffices, ...secondaryOffices];

                return {
                    ...state,
                    tempOffices: newOffices
                        .map((office, index) => {
                            if (index === newOffices.length - 1) {
                                return office;
                            }

                            return {
                                ...office,
                                title: index ? 'Offices' : 'Headquarters',
                            };
                        }),
                };
            })();

        case CLOSE_LOCATION_STEP :
            return {
                ...state,
                tempOffices: [],
                step: null,
                active: [],
            };

        case SHOW_DESCRIPTION_STEP :
            return {
                ...state,
                step: type,
                active: [DESCRIPTION_STEP],
            };

        case SAVE_DESCRIPTION_DATA :
            if (!payload.description) {
                return {
                    ...state,
                    description: null,
                    progress: state.progress
                        .filter((step) => step !== DESCRIPTION_STEP),
                    active: [],
                };
            }

            return {
                ...saveStep({
                    state,
                    step: DESCRIPTION_STEP,
                    payload,
                }),
                active: [],
            };

        case SHOW_QUOTE_OR_MOTTO_STEP :
            return {
                ...state,
                step: type,
                active: [QUOTE_OR_MOTTO_STEP],
            };

        case SAVE_QUOTE_OR_MOTTO_DATA :
            // in order to decrease profile completion level
            // when reduce receive
            if (!payload.quoteOrMotto) {
                return {
                    ...state,
                    quoteOrMotto: null,
                    progress: state.progress
                        .filter((step) => step !== QUOTE_OR_MOTTO_STEP),
                    active: [],
                };
            }

            return {
                ...saveStep({
                    state,
                    step: QUOTE_OR_MOTTO_STEP,
                    payload,
                }),
                active: [],
            };

        case SHOW_PHOTO_STEP :
            return {
                ...state,
                step: type,
                active: [PHOTO_STEP],
            };

        case SAVE_COMPANY_PHOTO :
            return (() => {
                const meta = aggregatePhotos({
                    progress: state.progress,
                    photos: [...state.photos, {
                        ...payload,
                        isUploaded: true,
                    }],
                });

                return {
                    ...state,
                    active: [PHOTO_STEP],
                    ...meta,
                };
            })();
        case REMOVE_COMPANY_PHOTO :
            return (() => {
                const photosWithoutRemoved = photosInState
                    .filter((item) => (item.mediaId !== payload.id));
                const meta = aggregatePhotos({
                    progress: state.progress,
                    photos: photosWithoutRemoved,
                });

                return {
                    ...state,
                    ...meta,
                };
            })();
        case SET_DEFAULT_STATE :
            return defaultState;

        case CLOSE_SOCIAL_MEDIA_STEP :
        case CLOSE_DESCRIPTION_STEP :
        case CLOSE_QUOTE_OR_MOTTO_STEP :
        case CLOSE_PHOTO_STEP :
            return {
                ...state,
                step: null,
                active: [],
            };

        case FILL_IN_PROFILE_SUCCEEDED :
            return (() => {
                const adaptedPhotos = payload.photos
                    .map((id) => ({
                        mediaId: id,
                        isUploaded: true,
                    }));
                const metaPhotos = aggregatePhotos({
                    progress: lodash.union(state.progress, payload.progress),
                    photos: adaptedPhotos,
                });

                return {
                    ...state,
                    summary: payload.summary,
                    socialMedia: payload.socialMedia,
                    location: payload.location
                        .map((office, index) => ({
                            ...getOfficeComponentKey(),
                            ...office,
                            title: index ? 'Offices' : 'Headquarters',
                            place: `${office.city}, ${office.state}`,
                        }))
                        .concat({
                            ...getOfficeComponentKey(),
                            place: null,
                        }),
                    description: payload.description,
                    quoteOrMotto: payload.quoteOrMotto,
                    profilePhoto: payload.profilePhoto,
                    ...metaPhotos,
                    step: null,
                    active: [],
                };
            })();

        default : return state;
    }
};

export const getApplicationCompany = (state) => (state.applicationCompany);

export const getSummary = (state) => (state.applicationCompany.summary);

export const getTempOffices = (state) => (state.applicationCompany.tempOffices);

export const getUploadedPhotos = (state) => (
    getApplicationCompany(state).photos
        .filter((photo) => (photo.isUploaded))
);

export const isUploaded = (state, { id }) => (
    !!state.applicationCompany.photos
        .filter((photo) => (photo.mediaId === id && photo.isUploaded))
        .pop()
);
