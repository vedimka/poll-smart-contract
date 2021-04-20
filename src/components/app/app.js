import React from 'react'

import Header from '../header/header'
import Test from '../web3test'

import useClasses from './classes'

const App = () => {
    const classes = useClasses()
    return (
        <>
            <Header/>
            <div className={classes.body}>
                <Test/>
            </div>
        </>
    );
}

export default App;
