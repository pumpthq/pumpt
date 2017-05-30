import React, { Component } from 'react'
import { AllMatchesSlider, BookmarkedMatchesSlider, NotInterestedMatchesSlider } from './candidate/Sliders'
import MatchesContainer from './candidate/MatchesContainer'
import VacancyContainer from './candidate/VacancyContainer'
import CompanyContainer from './CompanyContainer'
import EditContainer from './candidate/EditContainer'

import ChangePasswordContainer from 'containers/ChangePasswordContainer'

module.exports = {
    path: 'candidate/matches',
    component: MatchesContainer,
    childRoutes: [
        { path: 'edit', component: EditContainer },
        { path: 'company/:id', component: (props) => <CompanyContainer id={props.params.id} /> },
        { path: 'match/:mid/company/:cid/vacancy/:id', component: (props) => <VacancyContainer mid={props.params.mid} cid={props.params.cid} id={props.params.id} /> },
        { path: 'all', component: AllMatchesSlider },
        { path: 'bookmarked', component: BookmarkedMatchesSlider },
        { path: 'not-interested', component: NotInterestedMatchesSlider },
        { path: 'changePass', component: ChangePasswordContainer },
    ]
};
