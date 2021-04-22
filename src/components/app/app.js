import React, {useState, useContext} from 'react'

import Header from '../header/header'
import Test from '../web3test'//component used for test contract functions
import PollsList from '../pollsList/pollsList'
import Login from '../loginForm/loginForm'
import useClasses from './classes'
import {StateContext} from '../storage/Context'

const App = () => {
    const classes = useClasses()
    const state = useContext(StateContext)
    const [page, setPage] = useState('ownerPoll') // partPoll
    return (
        <>
            <Header page={page} setPage={setPage} />
            <div className={classes.body}>
                {state.web ? 
                    <PollsList typeOfList={page}/> :
                    <Login/>}
            </div>
            {/* <Test/> */}
        </>
    );
}

export default App;
