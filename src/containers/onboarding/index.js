module.exports = {
    path: 'onboarding',
    getChildRoutes(location, cb) {
        cb(null, [
            require('./candidate'),
            require('./company')
        ])
    }
};
