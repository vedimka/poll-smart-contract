import React, { useState } from 'react'
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

const VoteForm = ({close}) => {
    const classes = useClasses()
    const [choise, setChoise] = useState(-1)
    const vote = () => {
    } 

    return (
        <Dialog 
            className={classes.root}
            open={true} 
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