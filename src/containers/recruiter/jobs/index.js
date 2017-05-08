import React, { Component } from 'react'
import EditContainer from './EditContainer'

module.exports = {
    path: 'jobs',
    component: require('./JobsContainer'),
    childRoutes:[
      { path: 'new', component: require('./NewContainer') },
      { path: 'edit/:id', component: (props) => <EditContainer id={props.params.id}/> },
      {
          path: 'show',
          component: require('./ShowContainer'),
          childRoutes: [
              { path: 'closed', component: require('./ClosedJobsSlider') },
              { path: 'open', component: require('./OpenJobsSlider') },
              { path: 'drafts', component: require('./DraftsJobsSlider') },
          ]
      },
    ]
};
