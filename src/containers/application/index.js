import CompanyApplicationContainer from './company/ApplicationContainer'
import CandidateApplicationContainer from './candidate/ApplicationContainer'
import ApplicationContainer from 'containers/application/ApplicationContainer'
import RequireAuth from 'wrappers/RequireAuth'


module.exports = {
    path: 'application',
    component: RequireAuth(ApplicationContainer),
    childRoutes: [
        { path: 'company', component: CompanyApplicationContainer },
        { path: 'candidate', component: CandidateApplicationContainer },
    ]
};
