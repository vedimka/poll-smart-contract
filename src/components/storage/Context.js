import React, { createContext, useReducer } from 'react'

import Reducer from './Reducer'

const initState = {
    web: null,
    ownerPoll: [],
    partPoll: []
}
const Context = createContext(initState)
const StateContext = createContext()
const DispatchContext = createContext()

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initState)
    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}

export { Context, StateContext, DispatchContext }
export default Store