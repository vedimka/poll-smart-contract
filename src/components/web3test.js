import React, { useContext } from 'react'
import Button from '@material-ui/core/Button'
import Web3 from 'web3'
import { StateContext, DispatchContext } from './storage/Context'
import contractFunc from '../connector'

const Test = () => {
    // const [web3, setWeb] = useState() 
    const reducer = useContext(DispatchContext)
    const state = useContext(StateContext)
    const ethLogin = async () => {
        const provider = await window.web3.currentProvider.enable()
        const newWeb = new Web3(Web3.givenProvider)
        // setWeb(newWeb)
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
        // contractFunc(state.web, {type: 'createPoll', title: '', description: ''})
        contractFunc(state.web, {type: 'getPollResults', id: 0})
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