module.exports = {
    path: 'company/jobs',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./company/JobsContainer').default)
        })
    },
    getChildRoutes(location, cb) {
        cb(null, [{
            path: 'open',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('./company/OpenJobsSlider').default)
                })
            }
        }, {
            path: 'drafts',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('./company/DraftsJobsSlider').default)
                })
            }
        }, {
            path: 'new',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('./company/NewJobsSlider').default)
                })
            }
        }, {
            path: 'closed',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('./company/ClosedJobsSlider').default)
                })
            }
        }])
    }
};
