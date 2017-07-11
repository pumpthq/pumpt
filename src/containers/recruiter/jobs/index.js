import React, { Component } from 'react'
import  ShowContainer  from './ShowContainer'
import  EditContainer  from './EditContainer'
import  ListContainer  from './ListContainer'
import  MatchesContainer  from './MatchesContainer'
import  CandidateContainer  from './CandidateContainer'

import { OpenJobsSlider, DraftJobsSlider, ClosedJobsSlider } from './Sliders'

module.exports = {
    path: 'jobs',
    // component: require('./JobsContainer'),
    childRoutes:[
      { path: 'new', component: require('./NewContainer') },
      {
          path: 'list',
          component: ListContainer,
          childRoutes: [
              { path: 'closed', component: ClosedJobsSlider },
              { path: 'open', component: OpenJobsSlider },
              { path: 'drafts', component: DraftJobsSlider },
          ]
      },
      { path: ':id/show', component: (props) => <ShowContainer id={props.params.id} matches={props.matches} /> },
      { path: ':id/edit', component: (props) => <EditContainer id={props.params.id}/> },

      { path: ':id/candidates', component: (props) => <MatchesContainer id={props.params.id}/> },
      { path: ':id/candidates/:cid', component: (props) => <CandidateContainer {...props.params} /> },

    ]
};
