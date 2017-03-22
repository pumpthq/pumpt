module.exports = {
    path: 'company',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./App').default)
        })
    },

};
