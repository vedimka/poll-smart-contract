import React, { useState, useContext } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Web3 from 'web3'
import { StateContext, DispatchContext } from './storage/Context'
import contractFunc from '../connector'

const Test = () => {

    const reducer = useContext(DispatchContext)
    const state = useContext(StateContext)
    const [data, setData] = useState({})
    const [res, setRes] = useState()
    const ethLogin = async () => {
        await window.web3.currentProvider.enable()
        const newWeb = new Web3(Web3.givenProvider)
        try{
            reducer({
                type: 'SET_WEB',
                payload: newWeb.eth
            })
        } catch(e) {
            console.log(e)
        }
        
    }

    const change = (e, type, isInt) => {
        let obj = data
        obj[type] = isInt ? +e.target.value : e.target.value 
        setData(data)
    }
      
    const send =async (type) => {
        console.log(await contractFunc(state.web, {type, ...data}))
    }

    return (
        <>
            <TextField id="voteId" onChange={(e) => change(e, 'id', true)} label="Vote id" />
            <TextField id="Address" onChange={(e) => change(e, 'address')} label="Address" />
            <TextField id="title" onChange={(e) => change(e, 'title')} label="Title" />
            <TextField id="descr" onChange={(e) => change(e, 'description')} label="Description" />
            <TextField id="vote" onChange={(e) => change(e, 'vote', true)} label="Vote" />
            <div ></div>
            <Button 
                onClick={ethLogin}
                variant='outlined'
                color='primary'
                >
                Login
            </Button>
            <Button 
                onClick={() => send('addVoterToPoll')}
                variant='outlined'
                >
                addVoterToPoll
            </Button>
            <Button 
                onClick={() => send('createPoll')}
                variant='outlined'
                >
                createPoll
            </Button>
            <Button 
                onClick={() => send('getCreatedPolls')}
                variant='outlined'
                >
                getCreatedPolls
            </Button>
            <Button 
                onClick={() => send('getVoterPolls')}
                variant='outlined'
                >
                getVoterPolls
            </Button>
            <Button 
                onClick={() => send('getPollResults')}
                variant='outlined'
                >
                getPollResults
            </Button>
            <Button 
                onClick={() => send('endPoll')}
                variant='outlined'
                >
                endPoll
            </Button>
            <Button 
                onClick={() => send('getPollInfoByID')}
                variant='outlined'
                >
                getPollInfoByID
            </Button>
            <Button 
                onClick={() => send('toVote')}
                variant='outlined'
                >
                toVote
            </Button>
            <div></div>
            <TextField
                id="standard-read-only-input"
                label="Result"
                defaultValue={res}
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                />
        </>
    )
}

export default Test