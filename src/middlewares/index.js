import { applyMiddleware, compose } from 'redux'
import logger from './logger'
import thunkMiddleware from 'redux-thunk'
import sagaMiddleware from './saga'
import routerMiddleware from './router'

const middleware = compose(
    applyMiddleware(
        thunkMiddleware,
        routerMiddleware,
        sagaMiddleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : devTools => devTools
)

export default middleware
