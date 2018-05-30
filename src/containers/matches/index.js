import React from 'react'
import {AllMatchesSlider, BookmarkedMatchesSlider, NotInterestedMatchesSlider, ApprovedMatchesSlider} from './candidate/Sliders'
import MatchesContainer from './candidate/MatchesContainer'
import VacancyContainer from './candidate/VacancyContainer'
import CompanyContainer from './CompanyContainer'
import EditContainer from './candidate/EditContainer'
import SettingsContainer from './SettingsContainer.jsx'

import ChangePasswordContainer from 'containers/ChangePasswordContainer'

import RequireAuth from 'wrappers/RequireAuth'

module.exports = {
    path: 'candidate/matches',
    component: RequireAuth(MatchesContainer),
    childRoutes: [
        { path: 'edit', component: EditContainer },
        { path: 'company/:id', component: (props) => <CompanyContainer id={props.params.id} /> },
        { path: 'match/:mid/company/:cid/vacancy/:id', component: (props) => <VacancyContainer mid={props.params.mid} cid={props.params.cid} id={props.params.id} /> },
        { path: 'all', component: AllMatchesSlider },
        { path: 'bookmarked', component: BookmarkedMatchesSlider },
        { path: 'not-interested', component: NotInterestedMatchesSlider },
        { path: 'approved', component: ApprovedMatchesSlider },
        { path: 'changePass', component: ChangePasswordContainer },
      { path: 'settings', component: SettingsContainer },
    ]
};
