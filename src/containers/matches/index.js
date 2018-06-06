import React, {Component} from 'react'
import { connect }  from 'react-redux'
import {AllMatchesSlider, BookmarkedMatchesSlider, NotInterestedMatchesSlider, ApprovedMatchesSlider} from './candidate/Sliders'
import MatchesContainer from './candidate/MatchesContainer'
import VacancyContainer from './candidate/VacancyContainer'
import CompanyContainer from './CompanyContainer'
import EditContainer from './candidate/EditContainer'
import SettingsContainer from './SettingsContainer.jsx'
import InactiveMatchesPlaceholder from './candidate/DeactivatedAccount.jsx'

import ChangePasswordContainer from 'containers/ChangePasswordContainer'

import RequireAuth from 'wrappers/RequireAuth'


const displayIfActive = (activeComponent) => (
 () => <InactiveMatchesPlaceholder activeComponent={activeComponent} />  
);

module.exports = {
    path: 'candidate/matches',
    component: RequireAuth(MatchesContainer),
    childRoutes: [
        { path: 'edit', component: EditContainer },
        { path: 'company/:id', component: displayIfActive( (props) => <CompanyContainer id={props.params.id} />) },
        { path: 'match/:mid/company/:cid/vacancy/:id', component: displayIfActive( (props) => <VacancyContainer mid={props.params.mid} cid={props.params.cid} id={props.params.id} /> )},
        { path: 'all', component: displayIfActive(AllMatchesSlider) },
        { path: 'bookmarked', component: displayIfActive(BookmarkedMatchesSlider) },
        { path: 'not-interested', component: displayIfActive(NotInterestedMatchesSlider) },
        { path: 'approved', component: displayIfActive(ApprovedMatchesSlider) },
        { path: 'changePass', component: ChangePasswordContainer },
      { path: 'settings', component: SettingsContainer },
    ]
};
