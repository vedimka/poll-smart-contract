import React, {useContext} from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import {StateContext, DispatchContext} from '../storage/Context'
import useClasses from './classes'
import getPolls from '../getPollsLists'

const Menu = ({page, setPage}) => {
    const classes = useClasses()
    const state = useContext(StateContext)
    const reducer = useContext(DispatchContext)

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
        }
    }

    const changePage = name => {
        if(page !== name){
            setPage(name)
        }
    }
    
    return (
        <div className={classes.root}>   
            <Button 
                className={page === "ownerPoll" ? 'menuItem active' : 'menuItem'}
                onClick={ () => changePage('ownerPoll')}>
                <div className='icon'>
                    <svg 
                        height="512pt" 
                        viewBox="0 -32 512.016 512" 
                        width="512pt">
                        <path d="m389.332031 448.007812h-330.664062c-32.363281 0-58.667969-26.304687-58.667969-58.667968v-330.664063c0-32.363281 26.304688-58.6679685 58.667969-58.6679685h266.664062c8.832031 0 16 7.1679685 16 15.9999995 0 8.832032-7.167969 16-16 16h-266.664062c-14.699219 0-26.667969 11.96875-26.667969 26.667969v330.664063c0 14.699218 11.96875 26.667968 26.667969 26.667968h330.664062c14.699219 0 26.667969-11.96875 26.667969-26.667968v-181.332032c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v181.332032c0 32.363281-26.304688 58.667968-58.667969 58.667968zm0 0"/><path d="m261.332031 266.675781c-4.09375 0-8.191406-1.558593-11.304687-4.695312l-96-96c-6.25-6.25-6.25-16.382813 0-22.632813s16.382812-6.25 22.632812 0l84.695313 84.691406 223.335937-223.335937c6.253906-6.253906 16.386719-6.253906 22.636719 0 6.25 6.25 6.25 16.382813 0 22.632813l-234.667969 234.667968c-3.136718 3.113282-7.230468 4.671875-11.328125 4.671875zm0 0"/>
                    </svg>
                </div>
                <Typography>Polls created by me</Typography>
            </Button>
            <Button 
                key="refresh"
                className='menuItem'
                onClick={refresh}
                margin='normal'>
                <div className='icon'>
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
                </div>
            </Button>
            <Button 
                className={page === "partPoll" ? 'menuItem active' : 'menuItem'}
                onClick={ () => changePage('partPoll')}>
                <div className='icon'>
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
                </div>
                <Typography>Guest polls</Typography>
            </Button>
        </div>
    )
}

export default Menu