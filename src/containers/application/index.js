import CompanyApplicationApp from './company/App'
import CandidateApplicationApp from './candidate/App'

module.exports = {
    path: 'application',
    childRoutes: [
        { path: 'company', component: CompanyApplicationApp },
        { path: 'candidate', component: CandidateApplicationApp },
    ]
};
