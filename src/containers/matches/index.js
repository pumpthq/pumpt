module.exports = {
    path: 'candidate/matches',
    component: require('./candidate/MatchesContainer'),
    childRoutes: [
        { path: 'all', component: require('./candidate/AllMatchesSlider') }
    ]
};
