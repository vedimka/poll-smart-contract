import React from 'react'

import Header from '../header/header'
import ListOfHomes from '../listOfHomes/listOfHomes'
import Test from '../web3test'

import useClasses from './classes'

const App = () => {
    const classes = useClasses()
    return (
        <>
            <Header/>
            <div className={classes.body}>
                <Test/>
                {/* <ListOfHomes/> */}
            </div>
        </>
    );
}

export default App;
