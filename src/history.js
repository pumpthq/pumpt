import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import store from './store';

const history = syncHistoryWithStore(browserHistory, store, {
    adjustUrlOnReplay : false, // the URL will not be kept in sync during time travel
})

export default history
