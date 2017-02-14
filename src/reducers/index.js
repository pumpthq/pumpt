import { combineReducers } from 'redux';
import routing from './routing';
import form from './form';
import candidateOnboarding from './candidateOnboarding';
import applicationCandidate from './applicationCandidate';
import companyOnboarding from './companyOnboarding';
import applicationCompany from './applicationCompany';
import applicationMedia from './applicationPhotoUploading';
import authorization from './authorization';
import companyJobs from './companyJobs';
import candidateMatches from './candidateMatches';
import apiError from './apiError';

import '../constants/dropdownData';

const rootReducer = combineReducers({
    apiError,
    routing,
    form,
    candidateOnboarding,
    applicationCandidate,
    companyOnboarding,
    applicationCompany,
    applicationMedia,
    authorization,
    companyJobs,
    candidateMatches,
});

export default rootReducer;
