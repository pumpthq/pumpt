import {compose} from 'redux'
import middleware from './middlewares'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const stateEnhancer = composeEnhancers(
    middleware,
    // persistState(null, {
    //     slicer : (paths) => {
    //         return (state) => {
    //             return state
    //         }
    //     }
    //     /*,
    //     deserialize : (state) => {
    //         const { currentStateIndex, computedStates } = state
    //         const realState = computedStates[currentStateIndex].state
    //
    //         // if (realState) realState.routing = {}
    //
    //         return state
    //     }*/
    // }),
)

export default stateEnhancer
