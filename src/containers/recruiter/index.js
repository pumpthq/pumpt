import EditContainer from 'containers/recruiter/EditContainer'

module.exports = {
    path: 'recruiter',
    component: require('./RecruiterContainer'),
    childRoutes:[
        {path: 'edit', component: EditContainer},
        require('./company'),
        require('./jobs')
    ]
};
