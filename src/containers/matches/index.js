module.exports = {
    path: 'candidate/matches',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./candidate/MatchesContainer').default)
        })
    },
    getChildRoutes(location, cb) {
        cb(null, [{
            path: 'all',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('./candidate/AllMatchesSlider').default)
                })
            }
        }])
    }
};
