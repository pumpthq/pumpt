module.exports = {
    path: 'candidate',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./App').default)
        })
    },

};
