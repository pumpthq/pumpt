import {combineReducers} from 'redux';
import routing from './routing';
import candidateOnboarding from './candidateOnboarding';
import applicationCandidate from './applicationCandidate';
import companyOnboarding from './companyOnboarding';
import applicationCompany from './applicationCompany';
import applicationMedia from './applicationPhotoUploading';
import authorization from './authorization';
import companyJobs from './companyJobs';
import candidateMatches from './candidateMatches';
import apiError from './api';
import { USER_LOGOUT_SUCCEEDED } from '../constants/authorization';
import {reducer as forms} from 'redux-form';

import '../constants/dropdownData';

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT_SUCCEEDED) {
    state = undefined
  }

  return appReducer(state, action)
}

const appReducer = combineReducers({
    apiError,
    routing,
    candidateOnboarding,
    applicationCandidate,
    companyOnboarding,
    applicationCompany,
    applicationMedia,
    authorization,
    companyJobs,
    candidateMatches,
		form: forms,
});

export default rootReducer;
