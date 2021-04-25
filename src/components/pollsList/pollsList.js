import React, { useState, useEffect, useContext } from 'react'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Fade from '@material-ui/core/Fade';
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
    const [copied, setCopy] = useState(false)
    const [address, setAddress] = useState('')
    const answers = ['agree', 'disagree', 'nd']
    
    useEffect( async () => {
        const addr = await state.web.getAccounts()
        setAddress(addr[0])
    }, [])

    useEffect( async () => {
        setPolls(state[typeOfList])
    }, [typeOfList])

    const copy = () => {
        try {
            navigator.clipboard.writeText(address)
            setCopy(true)
            setTimeout( () => setCopy(false), 1500)
        } catch (e) {
            reducer({
                type: 'SET_SNACKBAR',
                payload: {
                    isOpen: true,
                    text: 'Your browser does not support this feature',
                    type: 'warning'
                }
            })
        }
    }


    return (
        <Container className={classes.root}>
			<Grid container spacing={3}>
                <Grid item xs={12} key='header'>
                    <Paper
                        elevation={0}
                        className='paper header'>
                            { typeOfList === 'ownerPoll' ? "List of polls created by you" : 'List of polls in which you are a voter'}
                            <div className="description">
                                <Typography>Your etherium address: {address}
                                    <Tooltip 
                                        title="Copied!"
                                        TransitionComponent={Fade}
                                        disableFocusListener={true}
                                        disableHoverListener={true}
                                        open={copied}>
                                        <svg 
                                            onClick={copy}
                                            x="0px" y="0px"
                                            viewBox="0 0 488.3 488.3" 
                                            space="preserve">
                                            <g>
                                                <g>
                                                    <path d="M314.25,85.4h-227c-21.3,0-38.6,17.3-38.6,38.6v325.7c0,21.3,17.3,38.6,38.6,38.6h227c21.3,0,38.6-17.3,38.6-38.6V124
                                                        C352.75,102.7,335.45,85.4,314.25,85.4z M325.75,449.6c0,6.4-5.2,11.6-11.6,11.6h-227c-6.4,0-11.6-5.2-11.6-11.6V124
                                                        c0-6.4,5.2-11.6,11.6-11.6h227c6.4,0,11.6,5.2,11.6,11.6V449.6z"/>
                                                    <path d="M401.05,0h-227c-21.3,0-38.6,17.3-38.6,38.6c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5c0-6.4,5.2-11.6,11.6-11.6h227
                                                        c6.4,0,11.6,5.2,11.6,11.6v325.7c0,6.4-5.2,11.6-11.6,11.6c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5c21.3,0,38.6-17.3,38.6-38.6
                                                        V38.6C439.65,17.3,422.35,0,401.05,0z"/>
                                                </g>
                                            </g>
                                        </svg>
                                    </Tooltip>
                                </Typography>
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
                                        onClick={() => {setVote(true); setId(+item.id)}}>
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
            <VoteForm key='voteForm' id={id} open={vote} close={() => setVote(false)}/>
        </Container>
    )
}

export default PollsList