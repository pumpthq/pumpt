//API Middleware
import axios from 'axios'
import { API_URL } from '../constants/api'
import { API } from '../constants/actionTypes'

export default store => next => action => {
    if(action.type !== API) return next(action)

    const {url, success, error} = action.payload
    axios.get(API_URL + url)
    .then(res => store.dispatch(success(res.data)))
    .catch(err => store.dispatch(error(err)))
}
