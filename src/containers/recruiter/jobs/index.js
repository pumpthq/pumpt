import React, { Component } from 'react'
import EditContainer from './EditContainer'
import { OpenJobsSlider, DraftJobsSlider, ClosedJobsSlider } from './sliders'

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
              { path: 'closed', component: ClosedJobsSlider },
              { path: 'open', component: OpenJobsSlider },
              { path: 'drafts', component: DraftJobsSlider },
          ]
      },
    ]
};
