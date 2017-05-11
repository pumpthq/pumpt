import React, { Component } from 'react'
import { AllMatchesSlider, BookmarkedMatchesSlider, NotInterestedMatchesSlider } from './candidate/Sliders'
import MatchesContainer from './candidate/MatchesContainer'
import VacancyContainer from './candidate/VacancyContainer'
import CompanyContainer from './CompanyContainer'


module.exports = {
    path: 'candidate/matches',
    component: MatchesContainer,
    childRoutes: [
        { path: 'company/:id', component: (props) => <CompanyContainer id={props.params.id} /> },
        { path: 'vacancy/:id', component: (props) => <VacancyContainer id={props.params.id} /> },
        { path: 'all', component: AllMatchesSlider },
        { path: 'bookmarked', component: BookmarkedMatchesSlider },
        { path: 'not-interested', component: NotInterestedMatchesSlider }
    ]
};
