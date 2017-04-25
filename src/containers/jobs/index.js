module.exports = {
    path: 'company/jobs',
    component: require('./company/JobsContainer'),
    childRoutes:[
      { path: 'open', component: require('./company/OpenJobsSlider') },
      { path: 'drafts', component: require('./company/DraftsJobsSlider')  },
      { path: 'new', component: require('./company/NewJobsSlider') },
      { path: 'closed', component: require('./company/ClosedJobsSlider') }
    ]
};
