module.exports = {
    path: 'application',
    getChildRoutes(location, cb) {
        cb(null, [
            require('./candidate'),
            require('./company')
        ])
    }
};
