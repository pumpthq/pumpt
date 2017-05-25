import CompanyApplicationContainer from './company/App'
import CandidateApplicationContainer from './candidate/ApplicationContainer'

module.exports = {
    path: 'application',
    childRoutes: [
        { path: 'company', component: CompanyApplicationContainer },
        { path: 'candidate', component: CandidateApplicationContainer },
    ]
};
