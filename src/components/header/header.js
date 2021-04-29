import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import useClasses from './classes'

const Header = () => {
    const classes = useClasses()


    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar variant="dense" className='title'>
                    <Typography 
                        key='title'
                        variant="h6" 
                        color="inherit">
                        SmartVotes
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header