module.exports = {
    path: 'recruiter',
    component: require('./RecruiterContainer'),
    childRoutes:[
        require('./company'),
        require('./jobs')
    ]
};
