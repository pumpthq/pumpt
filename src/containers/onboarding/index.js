import CandidateApp from './candidate/App'
import CompanyApp from './company/App'
import {SHOW_DEFAULT_STEP} from 'constants/candidateOnboarding'

module.exports = {
    path: 'onboarding',
    childRoutes: [
        { path: 'company', component: require('./company/App') },
        { path: 'candidate', onEnter: (nextState, replace) => replace('/onboarding/candidate/'+SHOW_DEFAULT_STEP) },
        { path: 'candidate/:step', component: CandidateApp },

    ]
};
