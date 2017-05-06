//API Middleware
import axios from 'axios'
import { API_URL } from '../constants/api'
import { API } from '../constants/actionTypes'
import { fetchRequested, fetchSucceeded, fetchFailed } from '../actions/apiError'

export default store => next => action => {

    next(action) //always allow action to continue through middleware

    const { type, payload } = action
    if(type === API) {
      const {url, data, request = fetchRequested, success = fetchSucceeded, error = fetchFailed, method = 'get'} = payload

      store.dispatch(request({payload}))

      axios({ baseURL: API_URL, method, url, data })
      .then(res => store.dispatch(success(res.data)))
      .catch(err => store.dispatch(error(err)))
    }
}
