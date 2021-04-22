import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import useClasses from './classes'

const CreateForm = ({open, close}) => {
    const classes = useClasses()
    const [title, setTitle] = useState(null)  
    const [descr, setDescr] = useState(null)

    const create = () => {
        
        close()
    } 

    return (
        <Dialog 
            className={classes.root}
            open={open} 
            onClose={close} 
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create poll</DialogTitle>
            <DialogContent >
                <DialogContentText>
                    Enter a title and description for your new poll
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    onChange={e => setTitle(e.target.value)}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    onChange={e => setDescr(e.target.value)}
                    multiline
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={create} 
                    color="primary"
                    disabled={!title || !descr}>
                    create
                </Button>
                <Button onClick={close} color="primary">
                    close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateForm