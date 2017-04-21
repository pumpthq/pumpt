//API Middleware
import axios from 'axios'
import { API_URL } from '../constants/api'

export default apiMiddleware = store => next => action => {
    if(action.type !== API) return next(action)

    const {url, success} = action.payload
    axios.get(API_URL + url).then(res => {
        store.dispatch(payload.success(res.data))
    })
    // TODO: handle error from axios request
}
