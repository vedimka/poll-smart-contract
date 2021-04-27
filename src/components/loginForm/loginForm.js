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
        let created = [], 
            invited = []
        reducer( {
            type: 'SET_LOADER',
            payload: true
        })
        try {
            const polls = await contractFunc(newWeb.eth, {type: 'getUserPolls'})
            for(let item of polls) {
                let poll = {
                    id: +item.voteID,
                    title: item.info[0],
                    description: item.info[1],
                    status: +item.status,
                    voted: item.voted
                }
                if(poll.status === 1){
                    let results = await contractFunc(newWeb.eth, {type:'getPollResults', id: poll.id})
                    const agree = +results[0],
                            disagree = +results[1],
                            nd = +results[2],
                            sum = agree + disagree + nd
                    poll.result = {}
                    poll.result.agree = [agree, Math.round(agree / sum * 100) || 0]
                    poll.result.disagree = [disagree, Math.round(disagree / sum * 100)|| 0]
                    poll.result.nd = [nd, Math.round(nd / sum * 100)|| 0]
                }
                if(item.owner){
                    created.push(poll)
                } else {
                    invited.push(poll)
                }
            }
        } catch {
            invited = []
            created = []
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