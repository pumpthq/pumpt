module.exports = {
    path: 'application',
    childRoutes: [
        { path: 'company', component: require('./company/App') },
        { path: 'candidate', component: require('./candidate/App') },
    ]
};
