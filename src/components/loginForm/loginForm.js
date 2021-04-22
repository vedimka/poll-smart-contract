import React, {useContext} from 'react'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Web3 from 'web3'

import {DispatchContext} from '../storage/Context'
import useClasses from './classes'
import contractFunc from '../../connector'


const Login = () => {
    const classes = useClasses()
    const reducer = useContext(DispatchContext)

    const login =  async () => {
        await window.web3.currentProvider.enable()
        const newWeb = new Web3(Web3.givenProvider)
        let created, invited
        try {
            created = await contractFunc(newWeb.eth, {type:'getCreatedPolls'})
        } catch {
            created = []
        } finally {
            reducer({
                type: 'SET_OWNERPOLL',
                payload: created
            })
        }
        try{
            invited = await contractFunc(newWeb.eth, {type:'getVoterPolls'})
        } catch {
            invited = []
        } finally {
            reducer({
                type: 'SET_PARTPOLL',
                payload: invited
            })
        }
        console.log(created, invited)
        try{
            reducer({
                type: 'SET_WEB',
                payload: newWeb.eth
            })
        } catch(e) {
            console.log(e)
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
                        <Typography className="description">Please connect to metamask so that we can get your etherium address</Typography>
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