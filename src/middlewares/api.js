//API Middleware
import axios from 'axios'
import {API_URL} from '../constants/api'
import {API} from '../constants/actionTypes'
import {fetchFailed, fetchRequested, fetchSucceeded} from '../actions/api'

export default store => next => action => {

    if(next) next(action) //always allow action to continue through middleware

    const { type, payload } = action
    if(type === API) {
      const {url, data, request = fetchRequested, success = fetchSucceeded, error = fetchFailed, method = 'get'} = payload

      store.dispatch(request({payload}))

      return axios({ baseURL: API_URL, method, url, data })
      .then(res => {
          store.dispatch(success(res.data))
          return Promise.resolve(res.data) //keep the response data in the promise chain accessible from the return value
      })
      .catch(err => {
          if(err instanceof Error) throw err
          else store.dispatch(error(err))
          return Promise.reject(err) //keep the err in the promise chain accessible from the return value
      })
    }
}
