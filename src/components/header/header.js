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

import {StateContext, DispatchContext} from '../storage/Context'
import useClasses from './classes'
import getPolls from '../getPollsLists'

const Header = ({page, setPage}) => {
    const [openMenu, setMenu] = useState(false)
    const classes = useClasses()
    const state = useContext(StateContext)
    const reducer = useContext(DispatchContext)
   
    const toggleDrawer = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }
        setMenu(false)
    }

    const refresh = async () => {
        let created, invited

        reducer( {
            type: 'SET_LOADER',
            payload: true
        })
        try{
            const result = await getPolls(state.web)
            created = result.created
            invited = result.invited
        } catch {
            created = invited = []
        } finally {
            reducer({
                type: 'SET_OWNERPOLL',
                payload: created
            })
            reducer({
                type: 'SET_PARTPOLL',
                payload: invited
            })
            reducer({
                type: 'SET_SNACKBAR',
                payload: {
                    isOpen: true,
                    text: 'Polls refreshed',
                    type: 'info'
                }
            })
            reducer( {
                type: 'SET_LOADER',
                payload: false
            })
            setMenu(false)
        }
    }

    const changePage = name => {
        if(page !== name){
            setPage(name)
            setMenu(false)
        }
    }

    const logout = () => {
        reducer({
            type:'CLEAR'
        })
        setMenu(false)
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    <IconButton 
                        edge="start" 
                        className={classes.menuButton} 
                        onClick={() => setMenu(true)}
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
                {state.web ?
                    <>
                        <List>
                        <ListItem 
                                button 
                                className={classes.menuItem} 
                                onClick={refresh}
                                key="refresh">
                                <ListItemIcon className='icon'>
                                    <svg 
                                        x="0px" 
                                        y="0px"
                                        viewBox="0 0 480.35 480.35" 
                                        space="preserve">
                                        <g>
                                            <g>
                                                <path d="M171.821,10.011C117.777,26.075,71.114,60.653,40.015,107.682c-4.271,7.706-6.938,16.196-7.84,24.96v-84.32h-32v128h128
                                                    v-32h-72.32c35.828-68.925,106.646-112.572,184.32-113.6c92.115,1.071,172.856,61.854,199.36,150.08l30.72-9.12
                                                    C432.489,44.627,298.876-27.755,171.821,10.011z"/>
                                            </g>
                                        </g>
                                        <g>
                                            <g>
                                                <path d="M352.175,304.322v32h72.32c-35.828,68.925-106.646,112.572-184.32,113.6c-92.115-1.071-172.856-61.854-199.36-150.08
                                                    l-30.72,9.12c37.928,127.006,171.634,199.218,298.64,161.29c55.628-16.612,103.349-52.826,134.32-101.93
                                                    c3.318-6.262,5.075-13.233,5.12-20.32v84.32h32v-128H352.175z"/>
                                            </g>
                                        </g>
                                    </svg>
                                </ListItemIcon>
                                <ListItemText primary="Refresh polls" />
                            </ListItem>
                            <ListItem 
                                className={page === 'ownerPoll' ?classes.curPage : classes.menuItem} 
                                button 
                                onClick={() => changePage('ownerPoll')}
                                key="Polls created by me">
                                <ListItemIcon className='icon'>
                                    <svg 
                                        height="512pt" 
                                        viewBox="0 -32 512.016 512" 
                                        width="512pt">
                                        <path d="m389.332031 448.007812h-330.664062c-32.363281 0-58.667969-26.304687-58.667969-58.667968v-330.664063c0-32.363281 26.304688-58.6679685 58.667969-58.6679685h266.664062c8.832031 0 16 7.1679685 16 15.9999995 0 8.832032-7.167969 16-16 16h-266.664062c-14.699219 0-26.667969 11.96875-26.667969 26.667969v330.664063c0 14.699218 11.96875 26.667968 26.667969 26.667968h330.664062c14.699219 0 26.667969-11.96875 26.667969-26.667968v-181.332032c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v181.332032c0 32.363281-26.304688 58.667968-58.667969 58.667968zm0 0"/><path d="m261.332031 266.675781c-4.09375 0-8.191406-1.558593-11.304687-4.695312l-96-96c-6.25-6.25-6.25-16.382813 0-22.632813s16.382812-6.25 22.632812 0l84.695313 84.691406 223.335937-223.335937c6.253906-6.253906 16.386719-6.253906 22.636719 0 6.25 6.25 6.25 16.382813 0 22.632813l-234.667969 234.667968c-3.136718 3.113282-7.230468 4.671875-11.328125 4.671875zm0 0"/>
                                    </svg>
                                </ListItemIcon>
                                <ListItemText primary="Polls created by me" />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem 
                                className={page === 'partPoll' ?classes.curPage : classes.menuItem} 
                                button 
                                onClick={() => changePage('partPoll')}
                                key="Polls where I as a voter">
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
                        <List className={classes.logout}>
                            <ListItem 
                                className={classes.menuItem} 
                                onClick={logout}
                                button 
                                key="logout">
                                <ListItemIcon className='icon'>
                                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                            viewBox="0 0 490.667 490.667" space="preserve">
                                        <g>
                                            <g>
                                                <path d="M330.667,192c5.888,0,10.667-4.779,10.667-10.667v-128C341.333,23.936,317.419,0,288,0H53.333C23.915,0,0,23.936,0,53.333
                                                    v384c0,29.397,23.915,53.333,53.333,53.333H288c29.419,0,53.333-23.936,53.333-53.333v-128c0-5.888-4.779-10.667-10.667-10.667
                                                    S320,303.445,320,309.333v128c0,17.643-14.357,32-32,32H53.333c-17.643,0-32-14.357-32-32v-384c0-17.643,14.357-32,32-32H288
                                                    c17.643,0,32,14.357,32,32v128C320,187.221,324.779,192,330.667,192z"/>
                                            </g>
                                        </g>
                                        <g>
                                            <g>
                                                <path d="M480,234.667H138.667c-5.888,0-10.667,4.779-10.667,10.667S132.779,256,138.667,256H480
                                                    c5.888,0,10.667-4.779,10.667-10.667S485.888,234.667,480,234.667z"/>
                                            </g>
                                        </g>
                                        <g>
                                            <g>
                                                <path d="M487.531,237.824l-64-64c-4.16-4.16-10.923-4.16-15.083,0c-4.16,4.16-4.16,10.923,0,15.083l56.448,56.448l-56.448,56.448
                                                    c-4.16,4.16-4.16,10.923,0,15.083c2.091,2.069,4.821,3.115,7.552,3.115c2.731,0,5.461-1.045,7.531-3.093l64-64
                                                    C491.691,248.747,491.691,241.984,487.531,237.824z"/>
                                            </g>
                                        </g>
                                    </svg>
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </List>
                    </>:
                    <>
                        <List>
                            <ListItem 
                                className={classes.emp} 
                                button 
                                key="emp">
                                <ListItemText primary="" />
                            </ListItem>
                        </List>
                        <List className={classes.logout}>
                            <ListItem 
                                className={classes.menuItem} 
                                onClick={() => setMenu(false)}
                                button 
                                key="login">
                                <ListItemIcon className='icon'>
                                    <svg height="490.66667pt" viewBox="0 0 490.66667 490.66667" width="490.66667pt" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m437.332031 490.667969h-234.664062c-29.421875 0-53.335938-23.9375-53.335938-53.335938v-128c0-5.886719 4.78125-10.664062 10.667969-10.664062s10.667969 4.777343 10.667969 10.664062v128c0 17.644531 14.355469 32 32 32h234.664062c17.644531 0 32-14.355469 32-32v-384c0-17.640625-14.355469-32-32-32h-234.664062c-17.644531 0-32 14.359375-32 32v128c0 5.890625-4.78125 10.667969-10.667969 10.667969s-10.667969-4.777344-10.667969-10.667969v-128c0-29.394531 23.914063-53.332031 53.335938-53.332031h234.664062c29.421875 0 53.335938 23.9375 53.335938 53.332031v384c0 29.398438-23.914063 53.335938-53.335938 53.335938zm0 0"/><path d="m352 256h-341.332031c-5.890625 0-10.667969-4.777344-10.667969-10.667969 0-5.886719 4.777344-10.664062 10.667969-10.664062h341.332031c5.886719 0 10.667969 4.777343 10.667969 10.664062 0 5.890625-4.78125 10.667969-10.667969 10.667969zm0 0"/><path d="m288 320c-2.730469 0-5.460938-1.046875-7.550781-3.113281-4.160157-4.160157-4.160157-10.925781 0-15.085938l56.46875-56.46875-56.449219-56.445312c-4.160156-4.160157-4.160156-10.925781 0-15.085938 4.160156-4.15625 10.921875-4.15625 15.082031 0l64 64c4.160157 4.160157 4.160157 10.925781 0 15.085938l-64 64c-2.089843 2.066406-4.820312 3.113281-7.550781 3.113281zm0 0"/>
                                    </svg>
                                </ListItemIcon>
                                <ListItemText primary="Login" />
                            </ListItem>
                        </List>
                    </>
                }
            </Drawer>
        </div>
    )
}

export default Header