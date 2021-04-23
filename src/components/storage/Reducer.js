const Reducer = (state, action) => {
    switch(action.type) {
        case "SET_WEB":
            return {
                ...state,
                web: action.payload
            }
        case 'SET_LOADER': 
            return {
                ...state,
                loader: action.payload
            }
        case 'SET_SNACKBAR': 
            return {
                ...state,
                snackbar: action.payload
            }
        case "SET_OWNERPOLL":
            return {
                ...state, 
                ownerPoll: action.payload
            }
        case "SET_PARTPOLL":
            return {
                ...state,
                partPoll: action.payload
            }
        case "CLEAR":
            return {
                web: null,
                loader: false,
                ownerPoll: [],
                partPoll: [],
                snackbar: {
                    isOpen: false,
                    text: '',
                    type: 'success'
                },
            }
        default:
            return state
    }
}

export default Reducer