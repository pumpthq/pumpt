import {applyMiddleware, compose} from 'redux'
import sagaMiddleware from './saga'
import routerMiddleware from './router'
import apiMiddleware from './api'

const middleware = compose(
    applyMiddleware(
        apiMiddleware,
        routerMiddleware,
        sagaMiddleware
    )
)

export default middleware
