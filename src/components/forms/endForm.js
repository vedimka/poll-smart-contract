import React, { useState, useContext } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import useClasses from './classes'
import {StateContext, DispatchContext} from '../storage/Context'
import contractFunc from '../../connector'

const EndingForm = ({id, open, close}) => {
    const classes = useClasses()
    const state = useContext(StateContext)
    const reducer = useContext(DispatchContext)

    const end = async () => {
        reducer( {
            type: 'SET_LOADER',
            payload: true
        })
        let poll = state.ownerPoll.find(item => {
            if(item.id === id) return item
        })
        let snack = ['Poll is ended', 'info']
        try {
            const res = await contractFunc(state.web, {type: 'endPoll', id})
            let results = res.EndVote.returnValues.value
            const agree = +results[0],
                        disagree = +results[1],
                        nd = +results[2],
                        sum = agree + disagree + nd

            poll.result.agree = [agree, Math.round(agree / sum * 100)]
            poll.result.dpollsagree = [disagree, Math.round(disagree / sum * 100)]
            poll.result.nd = [nd, Math.round(nd / sum * 100)]
            let created  = state.ownerPoll.map(item => {
                if(item.id === id){
                    item = poll
                }
            })
            reducer({
                type: 'SET_OWNER',
                payload: created
            })

        } catch (e) {
            const error = e.message ? e.message : 'Invalid transaction'
            snack = [error, 'error']
        }
        close()
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
            <DialogTitle id="form-dialog-title">Conform ending</DialogTitle>
            <DialogContent >
                <DialogContentText>
                    Confirm the action to end the poll. After confirmation, you will receive the voting results and no one will be able to vote in this poll
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={end} 
                    color="primary">
                    confirm
                </Button>
                <Button onClick={close} color="primary">
                    close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EndingForm