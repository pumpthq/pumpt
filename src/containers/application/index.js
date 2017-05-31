import CompanyApplicationContainer from './company/ApplicationContainer'
import CandidateApplicationContainer from './candidate/ApplicationContainer'

import RequireAuth from 'wrappers/RequireAuth'

const ApplicationContainer = (props) => (<div>{props.children}</div>)

module.exports = {
    path: 'application',
    component: RequireAuth(ApplicationContainer),
    childRoutes: [
        { path: 'company', component: CompanyApplicationContainer },
        { path: 'candidate', component: CandidateApplicationContainer },
    ]
};
