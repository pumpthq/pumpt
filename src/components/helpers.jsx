export const tintedBackground = (background,r,g,b,a) => {
    return{
        backgroundImage:
            `

            linear-gradient(rgba(${r}, ${g}, ${b}, ${a}), rgba(${r}, ${g}, ${b}, ${a}))
            , url(${background})

            `
    }
}


import {API_URL,API_IMAGES} from 'constants/api'

export const apiImage = uuid => `${API_URL}${API_IMAGES}/${uuid}`;

export const dispatchProp = dispatch => ({dispatch})
