//API Middleware
import axios from 'axios'
import { API_URL } from '../constants/api'
import { API } from '../constants/actionTypes'
import { fetchSucceeded, fetchFailed } from '../actions/apiError'

export default store => next => action => {
    if(action.type !== API) return next(action)

    const {url, data, success = fetchSucceeded, error = fetchFailed, method = 'get'} = action.payload

    axios({ baseURL: API_URL, method, url, data })
    .then(res => store.dispatch(success(res.data)))
    .catch(err => store.dispatch(error(err)))
}
