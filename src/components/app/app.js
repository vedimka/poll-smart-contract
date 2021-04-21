import React from 'react'

import Header from '../header/header'
import Test from '../web3test'//component used for test contract functions
import PollsList from '../votesList/pollsList'
import useClasses from './classes'

const App = () => {
    const classes = useClasses()
    return (
        <>
            <Header/>
            <div className={classes.body}>
                <PollsList/>
                {/* <Test/> */}
            </div>
        </>
    );
}

export default App;
