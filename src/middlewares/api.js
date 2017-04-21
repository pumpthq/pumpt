//API Middleware
import axios from 'axios'
import { API_URL } from '../constants/api'

export default apiMiddleware = store => next => action => {
    if(action.type !== API) return next(action)

    const {url, success} = action.payload
    return axios.get(API_URL + url)
    .then(res => store.dispatch(payload.success(res.data)))
    .catch(err => store.dispatch(payload.error(err)))
}
