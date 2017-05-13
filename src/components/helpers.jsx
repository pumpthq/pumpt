export const tintedBackground = (background,r,g,b,a) => {
    return{
        backgroundImage:
            `

            linear-gradient(rgba(${r}, ${g}, ${b}, ${a}), rgba(${r}, ${g}, ${b}, ${a}))
            , url(${background})

            `
    }
}

export const dispatchProp = dispatch => ({dispatch})
