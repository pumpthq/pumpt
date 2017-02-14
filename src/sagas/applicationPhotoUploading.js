import axios from 'axios'
import { takeLatest, takeEvery } from 'redux-saga'
import { fork, call, put, cancel } from 'redux-saga/effects'
import { START_UPLOADING, RESTART_UPLOADING_IMAGE } from './../constants/applicationPhotoUploading'
import { API_URL, API_IMAGES } from './../constants/api'
import {
    startUploading,
    setImage,
    removeImage,
    cancelUploading,
    stopUploading,
    markFailed,
    retryUploading
} from './../actions/applicationPhotoUploading'

export function readAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.addEventListener('load', () => resolve(reader.result))
        reader.readAsDataURL(file)
    })
}

function* showPlaceholder({ id, file }) {
    try {
        const dataUrl = yield call(readAsDataURL, file)

        yield put(setImage({ id, url : dataUrl }))
    } catch (ex) {
        throw ex
    }
}

function sendImage({ file }) {
    const data = new FormData()

    data.append('image', file)
    return axios.post(`${API_URL}/images`, data)
}

export default function() {
    return [
        takeEvery(START_UPLOADING, function * (action) {
            const { payload } = action
            const id = payload.id
            let showPlaceholderTask = null

            try {
                showPlaceholderTask = yield fork(showPlaceholder, payload)

                const response = yield call(sendImage, { file : payload.file })

                if (response.status === 200) {
                    const imageId = response.data.id
                    const url = `${API_URL}${API_IMAGES}/${imageId}`

                    yield put(setImage({ id, imageId, url }))
                    yield put(payload.onDone.apply(null, [{ id : imageId }]))
                } else {
                    console.log(`Error: ${response.status} ${response.statusText}`)

                    yield put(removeImage({ id }))
                }

                yield put(stopUploading({ id }))
            } catch (ex) {
                yield cancel(showPlaceholderTask)

                if (ex.status === 500) {
                    yield put(markFailed({ id }))
                } else {
                    yield put(cancelUploading({ id }))
                }
            }
        }),
        takeEvery(RESTART_UPLOADING_IMAGE, function * (action) {
            const { payload } = action

            yield put(startUploading(payload))
        })
    ]
}
