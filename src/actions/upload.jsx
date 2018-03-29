import {API} from 'constants/actionTypes'
import {API_IMAGES, API_FILES} from 'constants/api'

export const uploadImage = (file,success) => {

    //🍰 translate File object into multipart form data
    const data = new FormData()
    data.append('image', file)

    return {
        type : API,
        payload : {
            method: 'POST',
            url: `${API_IMAGES}`,
            data,
            success
        }
    }
}

export const uploadFile = (file,success) => {

    //🍰 translate File object into multipart form data
    const data = new FormData()
    data.append('file', file)

    return {
        type : API,
        payload : {
            method: 'POST',
            url: `${API_FILES}`,
            data,
            success
        }
    }
}
