import { AllMatchesSlider, BookmarkedMatchesSlider } from './candidate/Sliders'
module.exports = {
    path: 'candidate/matches',
    component: require('./candidate/MatchesContainer'),
    childRoutes: [
        { path: 'all', component: AllMatchesSlider },
        { path: 'bookmarked', component: BookmarkedMatchesSlider }
    ]
};
