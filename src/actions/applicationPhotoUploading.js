import {
    CANCEL_UPLOADING,
    REMOVE_IMAGE,
    RESTART_UPLOADING_IMAGE,
    SET_DEFAULT_STATE,
    SET_IMAGE,
    START_UPLOADING,
    STOP_UPLOADING,
    UPLOADING_IMAGE_FAILED
} from './../constants/applicationPhotoUploading'

export const startUploading = ({ id, file, controller, onDone, async }) => ({
    type : START_UPLOADING,
    payload : {
        id,
        file,
        controller,
        onDone,
        async
    }
})

export const setImage = ({ id, imageId, url }) => ({
    type : SET_IMAGE,
    payload : {
        id,
        imageId,
        url
    }
})

export const removeImage = ({ id }) => ({
    type : REMOVE_IMAGE,
    payload : {
        id
    }
})

export const stopUploading = ({ id }) => ({
    type : STOP_UPLOADING,
    payload : {
        id
    }
})

export const cancelUploading = ({ id }) => ({
    type : CANCEL_UPLOADING,
    payload : {
        id
    }
})

export const markFailed = ({ id }) => ({
    type : UPLOADING_IMAGE_FAILED,
    payload : {
        id
    }
})

export const retryUploading = (payload) => ({
    type : RESTART_UPLOADING_IMAGE,
    payload
})

export const clearMediaState = () => ({
    type : SET_DEFAULT_STATE
})
