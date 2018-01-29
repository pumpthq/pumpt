export const tintedBackground = (background,r,g,b,a) => {
    return{
        backgroundImage:
            `

            linear-gradient(rgba(${r}, ${g}, ${b}, ${a}), rgba(${r}, ${g}, ${b}, ${a}))
            , url(${background})

            `
    }
}


import {API_IMAGES, API_URL} from 'constants/api'

export const apiImage = uuid => uuid ? `${API_URL}${API_IMAGES}/${uuid}` : undefined;

export const dispatchProp = dispatch => ({dispatch})

export const displayIndustries = (list) => {
  // list is [{value, parent}]
  if (list && Array.isArray(list) && list.length > 0) {
    return `${list[0].parent} | ${list.map(({ value }) => (value)).join(', ')}` 
  }
  return '';
}
