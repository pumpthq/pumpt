import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import store from './store';
import history from './history'
import App from './containers/App';

const rootRoute = {
        path: '/',
        component: App,
        indexRoute: { onEnter: (nextState, replace) => replace('/story/login') },
        childRoutes: [
            require('./containers/login'),
            require('./containers/onboarding'),
            require('./containers/application'),
            require('./containers/recruiter'),
            require('./containers/matches')
        ]
};

const routes = (
    <Provider store={store}>
        <Router history={history} routes={rootRoute}/>
    </Provider>
);

export default routes;
