import CandidateApp from './candidate/App'
import CompanyApp from './company/App'
import {SHOW_DEFAULT_STEP as CANDIDATE_SHOW_DEFAULT_STEP} from 'constants/candidateOnboarding'
import {SHOW_DEFAULT_STEP as COMPANY_SHOW_DEFAULT_STEP} from 'constants/companyOnboarding'

module.exports = {
    path: 'onboarding',
    childRoutes: [
        { path: 'company', onEnter: (nextState, replace) => replace('/onboarding/company/'+COMPANY_SHOW_DEFAULT_STEP) },
        { path: 'company/:step', component: CompanyApp },
        { path: 'candidate', onEnter: (nextState, replace) => replace('/onboarding/candidate/'+CANDIDATE_SHOW_DEFAULT_STEP) },
        { path: 'candidate/:step', component: CandidateApp },

    ]
};
