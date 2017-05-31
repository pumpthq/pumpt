import EditContainer from 'containers/recruiter/EditContainer'
import ChangePasswordContainer from 'containers/ChangePasswordContainer'
import RecruiterContainer from 'containers/recruiter/RecruiterContainer'

import RequireAuth from 'wrappers/RequireAuth'

module.exports = {
    path: 'recruiter',
    component: RequireAuth(RecruiterContainer), //🍮 route /recruiter/* will require auth
    childRoutes:[
        {path: 'edit', component: EditContainer},
        {path: 'changePass', component: ChangePasswordContainer},
        require('./company'),
        require('./jobs')
    ]
};
