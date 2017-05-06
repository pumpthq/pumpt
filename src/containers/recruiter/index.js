module.exports = {
    path: 'recruiter',
    component: require('./RecruiterContainer'),
    childRoutes:[
        require('./jobs')
    ]
};
