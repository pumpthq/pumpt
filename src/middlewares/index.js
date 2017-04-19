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
    )
    //Deprecated: https://github.com/zalmoxisus/redux-devtools-extension/issues/220
    //window.devToolsExtension ? window.devToolsExtension() : devTools => devTools
)

export default middleware
