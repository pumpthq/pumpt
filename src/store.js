import {createStore} from 'redux'
import reducers from './reducers'
import {runSaga} from './middlewares/saga'
import stateEnhancer from './stateEnhancer'

const store = createStore(reducers, stateEnhancer /*=> instead of middleware*/)

runSaga()

export default store
