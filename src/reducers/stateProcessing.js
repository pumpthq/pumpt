export const addObjectToArray = (state, arrayName, itemToAdd) => {
    let newState = {}
    let newArray = []
    for(var itemName in state) {
        if(itemName === arrayName) {
            newArray = [
                ...state[itemName],
                itemToAdd
            ]
            newState[itemName] = newArray
        } else {
            newState[itemName] = state[itemName]
        }
    }
    return newState
}

export const addStringToArrayUnique = (state, arrayName, stringToAdd) => {
    let newState = {}
    let newArray = []
    for(var itemName in state) {
        if(itemName === arrayName) {
            if(state[itemName].indexOf(stringToAdd) === -1) {
                newArray = [
                    ...state[itemName],
                    stringToAdd
                ]
            } else {
                newArray = [
                    ...state[itemName]
                ]
            }
            newState[itemName] = newArray
        } else {
            newState[itemName] = state[itemName]
        }
    }
    return newState
}

export const removeStringFromArray = (state, arrayName, stringToRemove) => {
    let newState = {}
    let newArray = []
    for(var itemName in state) {
        if(itemName === arrayName) {
            newArray = state[itemName].filter((item) => (item !== stringToRemove))
            newState[itemName] = newArray
        } else {
            newState[itemName] = state[itemName]
        }
    }
    return newState
}
