import React, { useState, useContext } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'

import useClasses from './classes'
import {StateContext, DispatchContext} from '../storage/Context'
import contractFunc from '../../connector'

const VoteForm = ({id, list, open, close}) => {
    const classes = useClasses()
    const [choise, setChoise] = useState(-1)
    const state = useContext(StateContext)
    const reducer = useContext(DispatchContext)

    const vote = async () => {
        reducer( {
            type: 'SET_LOADER',
            payload: true
        })
        let snack = ['Your vote has been counted', 'info']
        try {
            await contractFunc(state.web, {type: 'toVote', vote: +choise, id})
            let polls  = state[list]
            const index = polls.findIndex(x => x.id === id)
            polls[index].voted = true
            reducer({
                type: list === 'ownerPoll' ? 'SET_OWNER' : 'SET_PART',
                payload: polls
            })
        } catch (e) {
            const error = e.message ? e.message : 'You have already voted'
            snack = [error, 'error']
        }
        close()
        console.log(state.ownerPoll)
        reducer({
            type: 'SET_SNACKBAR',
            payload: {
                isOpen: true,
                text: snack[0],
                type: snack[1]
            }
        })
        reducer( {
            type: 'SET_LOADER',
            payload: false
        })
    } 


    return (
        <Dialog 
            className={classes.root}
            open={open} 
            onClose={close} 
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Vote</DialogTitle>
            <DialogContent >
                <FormControl component="fieldset">
                    <FormLabel component="legend">Poll options</FormLabel>
                    <RadioGroup name="votes" value={choise} onChange={e => setChoise(e.target.value)}>
                        <FormControlLabel value="0" control={<Radio color='primary'/>} label="Agree" />
                        <FormControlLabel value="1" control={<Radio color='primary'/>} label="Disagree" />
                        <FormControlLabel value="2" control={<Radio color='primary'/>} label="Not decided" />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={vote} 
                    color="primary"
                    disabled={choise === -1}>
                    Vote
                </Button>
                <Button 
                    onClick={close} 
                    color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default VoteForm