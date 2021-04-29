import React, {useContext} from 'react'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Web3 from 'web3'

import {DispatchContext} from '../storage/Context'
import useClasses from './classes'
import getPolls from '../getPollsLists'

const Login = () => {
    const classes = useClasses()
    const reducer = useContext(DispatchContext)

    const login =  async () => {
        let newWeb = null
        try {
            await window.web3.currentProvider.enable()
            newWeb = new Web3(Web3.givenProvider)
        } catch {
            reducer({
                type: 'SET_SNACKBAR',
                payload: {
                    isOpen: true,
                    text: 'You have to install MetaMask',
                    type: 'warning'
                }
            })
            return
        }
        let created, invited
        reducer( {
            type: 'SET_LOADER',
            payload: true
        })
        try {
            const res = await getPolls(newWeb.eth)
            created = res.created
            invited = res.invited

        } catch {
            invited = created = []
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
                type: 'SET_WEB',
                payload: newWeb.eth
            })
            reducer({
                type: 'SET_SNACKBAR',
                payload: {
                    isOpen: true,
                    text: 'Login success',
                    type: 'success'
                }
            })
            reducer( {
                type: 'SET_LOADER',
                payload: false
            })
        }
    }

    return (
        <Container className={classes.root}>
			<Grid container spacing={3}>
                <Grid item xs={12} key='login'>
                    <Paper
                        elevation={0}
                        className='paper'>
                        <Typography className="title">First you need to log in</Typography>
                        <Typography className="description">Please connect to metamask so that we can get your ethereum address</Typography>
                        <div className='btn'>
                            <Button onClick={login}>
                                Connect
                            </Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login