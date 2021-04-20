const Reducer = (state, action) => {
    switch(action.type) {
        case "SET_WEB":
            return {
                ...state,
                web: action.payload
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
                ownerPoll: [],
                partPoll: []
            }
        default:
            return state
    }
}

export default Reducer