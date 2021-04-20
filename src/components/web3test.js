import React, { useState, useContext } from 'react'
import Button from '@material-ui/core/Button'
import Web3 from 'web3'
import { Context, StateContext, DispatchContext } from './storage/Context'
import {getPollsIDByVoter} from '../connector'

const Test = () => {
    const [web3, setWeb] = useState() 
    const reducer = useContext(DispatchContext)
    const state = useContext(StateContext)
    const ethLogin = async () => {
        const provider = await window.web3.currentProvider.enable()
        const newWeb = new Web3(provider)
        setWeb(newWeb)
        try{
            reducer({
                type: 'SET_WEB',
                payload: newWeb.eth
            })
        } catch(e) {
            console.log(e)
        }
        
    }
      
      const send = () => {
        console.log(state.web)
        // getPollsIDByVoter(web3)
      }

    return (
        <>
            <Button 
                onClick={ethLogin}
                variant='outlined'
                color='primary'
                margin='normal'
                >
                Login
            </Button>
            <Button 
                onClick={send}
                variant='outlined'
                color='secondary'
                >
                Send
            </Button>
        </>
    )
}

export default Test