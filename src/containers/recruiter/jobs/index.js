import React, { Component } from 'react'
import EditContainer from './EditContainer'
import MatchesContainer from './MatchesContainer'
import CandidateContainer from './CandidateContainer'

import { OpenJobsSlider, DraftJobsSlider, ClosedJobsSlider } from './Sliders'

module.exports = {
    path: 'jobs',
    component: require('./JobsContainer'),
    childRoutes:[
      { path: 'new', component: require('./NewContainer') },
      {
          path: 'show',
          component: require('./ShowContainer'),
          childRoutes: [
              { path: 'closed', component: ClosedJobsSlider },
              { path: 'open', component: OpenJobsSlider },
              { path: 'drafts', component: DraftJobsSlider },
          ]
      },
      { path: ':id/edit', component: (props) => <EditContainer id={props.params.id}/> },

      { path: ':id/candidates', component: (props) => <MatchesContainer id={props.params.id}/> }
      { path: ':id/candidates/:cid', component: (props) => <CandidateContainer {...props.params} /> }

    ]
};
