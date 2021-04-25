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

const getPolls = async (web, type) => {
    let polls = []
    const res = await contractFunc(web.eth, {type})
    res.map(async (item) => {
        let i = {
            title: item[1][0],
            description: item[1][1],
            id: +item[0],
            status: +item[2],
            result: {
                agree: [0, 0],
                disagree: [0,0],
                nd: [0,0]
            }
        }
        if(i.status === 1){
            try{
                let results = await contractFunc(web.eth, {type:'getPollResults', id: +item[0]})
                const agree = +results[0],
                        disagree = +results[1],
                        nd = +results[2],
                        sum = agree + disagree + nd

                i.result.agree = [agree, Math.round(agree / sum * 100)]
                i.result.disagree = [disagree, Math.round(disagree / sum * 100)]
                i.result.nd = [nd, Math.round(nd / sum * 100)]
            } catch(e) {
                i.result = {
                    agree: [0, 0],
                    disagree: [0,0],
                    nd: [0,0]
                }
            }
        }
        polls.push(i)
    })
    return polls
}

const Login = () => {
    const classes = useClasses()
    const reducer = useContext(DispatchContext)

    const login =  async () => {
        await window.web3.currentProvider.enable()
        const newWeb = new Web3(Web3.givenProvider)
        let created, invited
        reducer( {
            type: 'SET_LOADER',
            payload: true
        })
        try {
            created = await getPolls(newWeb, 'getCreatedPolls')
        } catch {
            created = []
        } finally {
            reducer({
                type: 'SET_OWNERPOLL',
                payload: created
            })
        }
        try{
            invited = await getPolls(newWeb, 'getVoterPolls')
        } catch {
            invited = []
        } finally {
            reducer({
                type: 'SET_PARTPOLL',
                payload: invited
            })
        }
        try{
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
        } catch(e) {
            reducer({
                type: 'SET_SNACKBAR',
                payload: {
                    isOpen: true,
                    text: e.message,
                    type: 'error'
                }
            })
        }
        reducer( {
            type: 'SET_LOADER',
            payload: false
        })
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