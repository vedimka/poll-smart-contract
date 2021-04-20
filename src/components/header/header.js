import React, { useState, useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import {StateContext} from '../storage/Context'
import useClasses from './classes'

const Header = () => {
    const [openMenu, setMenu] = useState(false)
    const classes = useClasses()
    const state = useContext(StateContext)
    const toggleDrawer = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }
        setMenu(false)
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    <IconButton 
                        edge="start" 
                        className={classes.menuButton} 
                        onClick={() => {
                            setMenu(true)
                            console.log(state)
                        }}
                        color="inherit" 
                        aria-label="menu">
                    <MenuIcon />
                    </IconButton>
                    <Typography 
                        key='title'
                        variant="h6" 
                        color="inherit">
                        SmartVotes
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer 
                anchor='left' 
                open={openMenu} 
                onClose={toggleDrawer}>
                <List>
                    <ListItem className={classes.menuItem} button key="Polls created by me">
                        <ListItemIcon className='icon'>
                            <svg height="512pt" viewBox="0 -32 512.016 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
                                <path d="m389.332031 448.007812h-330.664062c-32.363281 0-58.667969-26.304687-58.667969-58.667968v-330.664063c0-32.363281 26.304688-58.6679685 58.667969-58.6679685h266.664062c8.832031 0 16 7.1679685 16 15.9999995 0 8.832032-7.167969 16-16 16h-266.664062c-14.699219 0-26.667969 11.96875-26.667969 26.667969v330.664063c0 14.699218 11.96875 26.667968 26.667969 26.667968h330.664062c14.699219 0 26.667969-11.96875 26.667969-26.667968v-181.332032c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v181.332032c0 32.363281-26.304688 58.667968-58.667969 58.667968zm0 0"/><path d="m261.332031 266.675781c-4.09375 0-8.191406-1.558593-11.304687-4.695312l-96-96c-6.25-6.25-6.25-16.382813 0-22.632813s16.382812-6.25 22.632812 0l84.695313 84.691406 223.335937-223.335937c6.253906-6.253906 16.386719-6.253906 22.636719 0 6.25 6.25 6.25 16.382813 0 22.632813l-234.667969 234.667968c-3.136718 3.113282-7.230468 4.671875-11.328125 4.671875zm0 0"/>
                            </svg>
                        </ListItemIcon>
                        <ListItemText primary="Polls created by me" />
                    </ListItem>
                    <ListItem className={classes.menuItem} button key="Create a new poll">
                        <ListItemIcon className='icon'>
                            <svg id="Layer_1" enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                                <path d="m237.102 366v-90.018h-90c-11.046 0-20-8.954-20-20s8.954-20 20-20h90v-90.982c0-11.046 8.954-20 20-20s20 8.954 20 20v90.982h90c11.046 0 20 8.954 20 20s-8.954 20-20 20h-90v90.018c0 11.046-8.954 20-20 20s-20-8.954-20-20zm254.898-15c11.046 0 20-8.954 20-20v-251c0-44.112-35.888-80-80-80h-352c-44.112 0-80 35.888-80 80v352c0 44.112 35.888 80 80 80h352c44.112 0 80-35.888 80-80 0-11.046-8.954-20-20-20s-20 8.954-20 20c0 22.056-17.944 40-40 40h-352c-22.056 0-40-17.944-40-40v-352c0-22.056 17.944-40 40-40h352c22.056 0 40 17.944 40 40v251c0 11.046 8.954 20 20 20z"/>
                            </svg>
                        </ListItemIcon>
                        <ListItemText primary="Create a new poll" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem className={classes.menuItem} button key="Polls where I as a voter">
                        <ListItemIcon className='icon'>
                        <svg id="_x31_" enableBackground="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <g>
                                    <path d="m21.5 24h-19c-1.379 0-2.5-1.122-2.5-2.5v-15c0-1.378 1.121-2.5 2.5-2.5h5.5c.276 0 .5.224.5.5s-.224.5-.5.5h-5.5c-.827 0-1.5.673-1.5 1.5v15c0 .827.673 1.5 1.5 1.5h19c.827 0 1.5-.673 1.5-1.5v-15c0-.827-.673-1.5-1.5-1.5h-5.5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5.5c1.379 0 2.5 1.122 2.5 2.5v15c0 1.378-1.121 2.5-2.5 2.5z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="m23.5 14h-23c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h23c.276 0 .5.224.5.5s-.224.5-.5.5z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="m18 10h-12c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h12c.276 0 .5.224.5.5s-.224.5-.5.5z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="m14.31 10c-.128 0-.257-.049-.354-.147-.194-.196-.194-.512.002-.707l2.995-2.986-4.953-4.953-4.952 4.953 2.995 2.986c.196.195.196.511.002.707-.195.196-.514.195-.707.001l-3.351-3.34c-.094-.094-.147-.221-.147-.353s.053-.261.146-.354l5.66-5.66c.195-.195.512-.195.707 0l5.66 5.66c.094.093.147.221.147.354s-.053.26-.147.354l-3.351 3.34c-.097.096-.224.145-.352.145z"/>
                                </g>
                            </g>
                        </svg>
                        </ListItemIcon>
                        <ListItemText primary="Polls where I as a voter" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    )
}

export default Header