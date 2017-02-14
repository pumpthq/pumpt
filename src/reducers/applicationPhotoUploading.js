import {
    START_UPLOADING,
    STOP_UPLOADING,
    CANCEL_UPLOADING,
    SET_IMAGE,
    REMOVE_IMAGE,
    UPLOADING_IMAGE_FAILED,
    RESTART_UPLOADING_IMAGE,
    SET_DEFAULT_STATE,
} from './../constants/applicationPhotoUploading';

const defaultState = {
    files: []
};

export default (state = defaultState, action) => {
    const { payload } = action;
    const files = state.files.slice();

    switch (action.type) {
        case START_UPLOADING :
            if (!payload.async) {
                const isBusy = files
                    .filter((element) =>
                        (element.controller === payload.controller && !element.async));

                if (isBusy.length > 0) return { files };
            }

            if (~files.findIndex((item) => (item.id === payload.id))) {
                return { files };
            }

            files.push({
                id: payload.id,
                file: payload.file,
                controller: payload.controller,
                async: payload.async,
                isUploading: true,
            });

            return {
                files,
            };
        case STOP_UPLOADING :
            return {
                files: files.map((element) => {
                    if (element.id === payload.id) {
                        return {
                            ...element,
                            isUploading: false,
                        };
                    }

                    return element;
                }),
            };
        case CANCEL_UPLOADING :
            return {
                files: files.map((element) => {
                    if (element.id === payload.id) {
                        return {
                            ...element,
                            isUploading: false,
                            url: null,
                        };
                    }

                    return element;
                }),
            };
        case SET_IMAGE :
            return {
                files: files.map((element) => {
                    if (element.id === payload.id) {
                        return {
                            ...element,
                            imageId: payload.imageId,
                            url: payload.url,
                        };
                    }

                    return element;
                }),
            };
        case REMOVE_IMAGE :
            return {
                files: files.filter((element) => (element.id !== payload.id)),
            };

        case RESTART_UPLOADING_IMAGE :
            return {
                files: files.map((element) => {
                    if (element.id === payload.id) {
                        return {
                            ...element,
                            isUploading: true,
                            isUploadingFailed: false,
                        };
                    }

                    return element;
                }),
            };
        case UPLOADING_IMAGE_FAILED :
            return {
                files: files.map((element) => {
                    if (element.id === payload.id) {
                        return {
                            ...element,
                            isUploading: false,
                            url: null,
                            isUploadingFailed: true,
                        };
                    }

                    return element;
                }),
            };

        case SET_DEFAULT_STATE :
            return defaultState;
        default :
            return state;
    }
};

export const getApplicationMedia = (state) => (state.applicationMedia);

export const getPhoto = (state, { id }) => (
    state.applicationMedia.files
        .filter((element) => (element.id === id))
        .pop()
);

export const getUploadedPhoto = (state, { id }) => (
    state.applicationMedia.files
        .filter((element) =>
            (element.id === id &&
            !element.isUploading &&
            !element.isUploadingFailed))
        .pop()
);

export const getPhotosByController = (state, { controller }) => (
    state.applicationMedia.files
        .filter((element) =>
            (element.controller === controller))
);

export const getPhotoByController = (state, { controller }) => (
    getPhotosByController(state, { controller })
        .pop()
);
