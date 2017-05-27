import EditContainer from 'containers/recruiter/EditContainer'
import ChangePasswordContainer from 'containers/ChangePasswordContainer'
module.exports = {
    path: 'recruiter',
    component: require('./RecruiterContainer'),
    childRoutes:[
        {path: 'edit', component: EditContainer},
        {path: 'changePass', component: ChangePasswordContainer},
        require('./company'),
        require('./jobs')
    ]
};
