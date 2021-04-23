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

const InviteForm = ({id, open, close}) => {
    const classes = useClasses()
    const [address, setAddress] = useState(null) 
    const [error, setError] = useState('clear')
    const state = useContext(StateContext)
    const reducer = useContext(DispatchContext)

    const invite = async () => {
        if(address.match(/^0x[a-fA-F0-9]{40}$/g)){
            reducer( {
                type: 'SET_LOADER',
                payload: true
            })
            setError('clear')
            let snack = ['Friend invited', 'info']
            try {
                await contractFunc(state.web, {type: 'addVoterToPoll', address, id})
            } catch (e) {
                snack = [e.message, 'error']
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
        } else {
            setError('Incorrect etherium address')
            return
        }
    }

    return (
        <Dialog 
            className={classes.root}
            open={open} 
            onClose={close} 
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Invite friend</DialogTitle>
            <DialogContent >
                <DialogContentText>
                    Paste your friend's etherium address to invite him to this poll
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="address"
                    label="Etherium Address"
                    type="text"
                    onChange={e => {setAddress(e.target.value); setError('clear')}}
                    error={error !== 'clear'}
                    helperText={error !== 'clear' ? error : ''}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={invite} color="primary">
                    Invite
                </Button>
                <Button onClick={close} color="primary">
                    close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default InviteForm