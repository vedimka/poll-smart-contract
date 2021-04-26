import React, { useState, useEffect, useContext } from 'react'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';

import VoteForm from '../forms/voteForm'
import CreateForm from '../forms/createForm'
import InviteForm from '../forms/inviteForm'
import EndingForm from '../forms/endForm'

import {StateContext, DispatchContext } from '../storage/Context'

import useClasses from './classes'

const PollsList = ({typeOfList}) => {
    const classes = useClasses()
    const state = useContext(StateContext)
    const reducer = useContext(DispatchContext)
    const [polls, setPolls] = useState(state[typeOfList])
    const [invite, setInvite] = useState(false)
    const [vote, setVote] = useState(false)
    const [create, setCreate] = useState(false)
    const [end, setEnd] = useState(false)
    const [id, setId] = useState(-1)
    const [address, setAddress] = useState('')
    const answers = ['agree', 'disagree', 'nd']
    
    useEffect( async () => {
        const addr = await state.web.getAccounts()
        setAddress(addr[0])
    }, [])

    useEffect(() => {
        setPolls(state[typeOfList])
    }, [typeOfList, state[typeOfList]])

    const toVote = (voted, id) => {
        if(!voted){
            setVote(true)
            setId(+id)
        } else {
            reducer({
                type: 'SET_SNACKBAR',
                payload: {
                    isOpen: true,
                    text: 'You have already voted to this poll',
                    type: 'warning'
                }
            })
        }
    }

    return (
        <Container className={classes.root}>
			<Grid container spacing={3} key='content'>
                <Grid item xs={12} key='header'>
                    <Paper
                        elevation={0}
                        className='paper header'>
                            { typeOfList === 'ownerPoll' ? "List of polls created by you" : 'List of polls in which you are a voter'}
                            <div className="description">
                                <Typography>Your etherium address: {address}</Typography>
                                <Typography>{ typeOfList === 'ownerPoll' ? "The number of polls you created" : 'The number of polls in which you are a voter'}: {polls.length}</Typography>
                            </div>
                    </Paper>
                </Grid>
                { polls.length ? 
                    polls.map(item => (
                        <Grid item xs={12} key={item.id}>
                            <Paper 
                                elevation={0}
                                className='paper'
                                >
                                <div className="caption">
                                    <Typography className="title">{item.title}</Typography>
                                    <Typography className="description">{item.description}</Typography>
                                </div>
                                {item.status === 0 ?
                                <div className='btn-group'>
                                    <Button 
                                        color='primary'
                                        onClick={() => toVote(item.voted, +item.id)}>
                                        Vote
                                    </Button>
                                    {typeOfList === 'ownerPoll' ?
                                        <>
                                            <Button 
                                                color='primary'
                                                onClick={() => {setInvite(true); setId(+item.id)}}>
                                                Invite
                                            </Button>
                                            <Button 
                                                color='primary'
                                                onClick={() => {setEnd(true); setId(+item.id)}}>
                                                End poll
                                            </Button>
                                        </>
                                        : 
                                        <></>
                                    }
                                </div>:
                                <div className='results' key='results'>
                                    {answers.map(ans => (
                                        <>
                                            <Typography>{ans !== 'nd' ? ans.charAt(0).toUpperCase() + ans.slice(1) : 'Not decided'}</Typography>
                                            <Box display="flex" alignItems="center">
                                                <Box width="90%" mr={2}>
                                                <LinearProgress variant="determinate" value={item.result[ans][1]} />
                                                </Box>
                                                <Box minWidth={35}>
                                                <Typography variant="body2" color="textSecondary">{item.result[ans][0]} ({item.result[ans][1]}%)</Typography>
                                                </Box>
                                            </Box>
                                        </>
                                    ))}
                                </div>
                                }
                            </Paper>
                        </Grid>
                    )) : 
                    <Grid item xs={12} key='noPaper'>
                        <Paper
                            elevation={0}
                            className='paper'>
                            {typeOfList === 'ownerPoll' ? <div className="caption">
                                <Typography className="title">You haven't made any polls yet</Typography>
                                <Typography className="description">You can create a poll by clicking on the Create button, enter the name and description of the new vote and it will be created</Typography>
                            </div>:
                            <div className="caption">
                                <Typography className="title">You haven't been invited to poll yet</Typography>
                                <Typography className="description">You can copy your address and give it to your friend to invite you to poll</Typography>
                            </div>}
                        </Paper>
                    </Grid>
                }
            </Grid>
            { typeOfList === 'ownerPoll' ?
                <Button
                    key='createButton'
                    className={classes.createButton}
                    onClick={() => setCreate(true)}>
                    Create poll
                </Button>:
                <></>
            }
            <EndingForm key="endForm" id={id} open={end} close={() => setEnd(false)} />
            <InviteForm key="inviteForm" id={id} open={invite} close={() => setInvite(false)}/>
            <CreateForm key='createForm' open={create} close={() => setCreate(false)}/>
            <VoteForm key='voteForm' list={typeOfList} id={id} open={vote} close={() => setVote(false)}/>
        </Container>
    )
}

export default PollsList