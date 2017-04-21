import { applyMiddleware, compose } from 'redux'
import logger from './logger'
import thunkMiddleware from 'redux-thunk'
import sagaMiddleware from './saga'
import routerMiddleware from './router'
import apiMiddleware from './api'

const middleware = compose(
    applyMiddleware(
        apiMiddleware,
        thunkMiddleware,
        routerMiddleware,
        sagaMiddleware
    )
    //Deprecated: https://github.com/zalmoxisus/redux-devtools-extension/issues/220
    //window.devToolsExtension ? window.devToolsExtension() : devTools => devTools
)

export default middleware
