import {
    APPLICATION_UPDATE_COMPANY_SUCCEEDED,
    APPLICATION_UPDATE_RECRUITER_SUCCEEDED,
    CLOSE_DESCRIPTION_STEP,
    CLOSE_LOCATION_STEP,
    CLOSE_PHOTO_STEP,
    CLOSE_QUOTE_OR_MOTTO_STEP,
    CLOSE_SOCIAL_MEDIA_STEP,
    FETCH_LINKEDIN_DATA_FAILED,
    FETCH_LINKEDIN_DATA_REQUESTED,
    FETCH_LINKEDIN_DATA_SUCCEEDED,
    FILL_IN_PROFILE_FAILED,
    FILL_IN_PROFILE_SUCCEEDED,
    GET_LATEST_PROFILE,
    IMPORT_COMPLETED,
    IMPORT_STARTED,
    ONBOARDING_TO_APPLICATION_MIGRATION,
    PERSIST_TEMP_OFFICES,
    REMOVE_COMPANY_PHOTO,
    SAVE_COMPANY_PHOTO,
    SAVE_DESCRIPTION_DATA,
    SAVE_LOCATION_DATA,
    SAVE_PROFILE_PHOTO_DATA,
    SAVE_QUOTE_OR_MOTTO_DATA,
    SAVE_SOCIAL_MEDIA_DATA,
    SAVE_SUMMARY_DATA,
    SAVE_SUMMARY_DATA_FAILED,
    SAVE_SUMMARY_DATA_SUCCEEDED,
    SET_CITY_AND_STATE_TO_OFFICE,
    SET_DEFAULT_STATE,
    SHOW_DESCRIPTION_STEP,
    SHOW_LOCATION_STEP,
    SHOW_PHOTO_STEP,
    SHOW_QUOTE_OR_MOTTO_STEP,
    SHOW_SOCIAL_MEDIA_STEP,
} from './../constants/applicationCompany';
import {API} from 'constants/actionTypes'
import {API_COMPANY_ROOT, API_RECRUITER_ROOT,} from 'constants/api';

export const saveSummaryData = ({
    companyName,
    email,
    companyType,
		headquartersLocation,
    numberOfEmployees,
    foundationYear,
    websiteUrl,
    linkedInProfileUrl,
    twitterUsername,
    facebookProfileUrl,
}) => ({
    type: SAVE_SUMMARY_DATA,
    payload: {
        companyName,
        email,
        companyType,
        headquartersLocation,
        numberOfEmployees,
        foundationYear,
    },
});

export const updateCompany = (data)  => {
    return {
      type: API,
      payload:{
          method: 'PUT',
          url: `${API_COMPANY_ROOT}/current`,
          data,
          success: updateCompanySucceeded(data),
      }
    }
};

export const updateCompanySucceeded = (data) => company => {
    return {
      type: APPLICATION_UPDATE_COMPANY_SUCCEEDED,
      payload: {
          data,
          company,
      }
    }
};

export const updateRecruiter = (data)  => {
    return {
      type: API,
      payload:{
          method: 'PUT',
          url: `${API_RECRUITER_ROOT}/current`,
          data,
          success: updateRecruiterSucceeded(data),
      }
    }
};

export const updateRecruiterSucceeded = (data) => recruiter => {
    return {
      type: APPLICATION_UPDATE_RECRUITER_SUCCEEDED,
      payload: {
          data,
          recruiter,
      }
    }
};

export const getSummary = (state) =>
     state.applicationCompany.summary
;

export const migrateOnboardingToApplication = (payload) => ({
    type: ONBOARDING_TO_APPLICATION_MIGRATION,
    payload,
});

export const importStarted = () => ({
    type: IMPORT_STARTED,
});

export const importCompleted = () => ({
    type: IMPORT_COMPLETED,
});

export const fetchLinkedInData = () => ({
    type: FETCH_LINKEDIN_DATA_REQUESTED,
});

export const fetchLinkedInDataSucceeded = (payload) => ({
    type: FETCH_LINKEDIN_DATA_SUCCEEDED,
    payload,
});

export const fetchLinkedInDataFailed = () => ({
    type: FETCH_LINKEDIN_DATA_FAILED,
});

export const saveSummaryDataSucceeded = ({}) => ({
    type: SAVE_SUMMARY_DATA_SUCCEEDED,
    payload: {},
});

export const saveSummaryDataFailed = ({}) => ({
    type: SAVE_SUMMARY_DATA_FAILED,
    payload: {},
});

export const saveProfilePhotoData = ({ profilePhoto }) => ({
    type: SAVE_PROFILE_PHOTO_DATA,
    payload: {
        profilePhoto,
    },
});

export const showSocialMediaStep = () => ({
    type: SHOW_SOCIAL_MEDIA_STEP,
});

export const saveSocialMediaData = ({
    websiteUrl,
    linkedInProfileUrl,
    twitterUsername,
    facebookProfileUrl,
}) => ({
    type: SAVE_SOCIAL_MEDIA_DATA,
    payload: {
        websiteUrl,
        linkedInProfileUrl,
        twitterUsername,
        facebookProfileUrl,
    },
});

export const cancelSocialMediaStep = (payload = {}) => ({
    type: CLOSE_SOCIAL_MEDIA_STEP,
    payload: {},
});

export const showLocationStep = () => ({
    type: SHOW_LOCATION_STEP,
});

export const saveLocationData = () => ({
    type: SAVE_LOCATION_DATA,
    payload: {},
});

export const setCityAndStateToOffice = ({ id, city, state }) => ({
    type: SET_CITY_AND_STATE_TO_OFFICE,
    payload: {
        id,
        city,
        state,
    },
});

export const persistTempOffices = ({ offices }) => ({
    type: PERSIST_TEMP_OFFICES,
    payload: {
        offices,
    },
});

export const cancelLocationStep = (payload = {}) => ({
    type: CLOSE_LOCATION_STEP,
    payload: {},
});

export const showDescriptionStep = () => ({
    type: SHOW_DESCRIPTION_STEP,
});

export const saveDescriptionData = ({ description }) => ({
    type: SAVE_DESCRIPTION_DATA,
    payload: {
        description,
    },
});

export const cancelDescriptionStep = (payload = {}) => ({
    type: CLOSE_DESCRIPTION_STEP,
    payload: {},
});

export const showQuoteOrMottoStep = () => ({
    type: SHOW_QUOTE_OR_MOTTO_STEP,
});

export const saveQuoteOrMottoData = ({ quoteOrMotto }) => ({
    type: SAVE_QUOTE_OR_MOTTO_DATA,
    payload: {
        quoteOrMotto,
    },
});

export const cancelQuoteOrMottoStep = (payload = {}) => ({
    type: CLOSE_QUOTE_OR_MOTTO_STEP,
    payload: {},
});

export const showAddPhotoStep = () => ({
    type: SHOW_PHOTO_STEP,
});

// export const saveAddPhotoData = ({ photos }) => ({
//     type : SAVE_PHOTO_DATA,
//     payload : {
//         photos
//     }
// })

export const saveAddPhotoStep = ({ mediaId }) => ({
    type: SAVE_COMPANY_PHOTO,
    payload: {
        mediaId,
    },
});

export const cancelPhotoStep = (payload = {}) => ({
    type: CLOSE_PHOTO_STEP,
    payload: {},
});

export const removeCompanyPhoto = ({ id }) => ({
    type: REMOVE_COMPANY_PHOTO,
    payload: {
        id,
    },
});

export const getLatestProfile = () => ({
    type: GET_LATEST_PROFILE,
});

export const fillInProfileSucceeded = (payload) => ({
    type: FILL_IN_PROFILE_SUCCEEDED,
    payload,
});

export const fillInProfileFailed = (payload) => ({
    type: FILL_IN_PROFILE_FAILED,
    payload,
});

export const clearApplicationCompanyState = () => ({
    type: SET_DEFAULT_STATE,
});
