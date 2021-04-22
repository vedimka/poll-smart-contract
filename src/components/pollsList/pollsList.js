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

import {StateContext} from '../storage/Context'

import useClasses from './classes'

const PollsList = ({typeOfList}) => {
    const classes = useClasses()
    const votes = [
        {
            title: 'Hello',
            description: 'world',
            id: 0,
            state: 0 // 0 - inProgress, 1 - done
        },
        {
            title: 'Second',
            description: 'worldКогда вы загрузите файлы и отправите форму, мы сохраним ваше имя и фото профиля.',
            id: 1,
            state: 0 // 0 - inProgress, 1 - done
        },
        {
            title: 'Title',
            description: `We want to enable user to easily interact with our contracts. User has to be able to create pools, send ETH to the pool, transfer reward points, see who’s the Shark and other token holders.
            We also want to detect account from MetaMask extension and present just user specific data.
            Blockchain is slow compared to the user interactions and we don’t want user to sit and wait for the confirmations. That means it’s critical to implement transactions queue and enable user to see transaction status within Web Application or using tool like Etherscan.`,
            id: 2,
            state: 0 // 0 - inProgress, 1 - done
        },
        {
            title: 'Another',
            description: `We want to enable user to easily interact with our contracts. User has to be able to create pools, send ETH to the pool, transfer reward points, see who’s the Shark and other token holders.
            We also want to detect account from MetaMask extension and present just user specific data.`,
            id: 3,
            state: 1, // 0 - inProgress, 1 - done
            result: {
                agree: [5, Math.round(5 / 12 * 100)],  //agree / all * 100
                disagree: [4, Math.round(4 / 12 * 100)],
                nd: [3, Math.round(3 / 12 * 100)]
            }
        },
        {
            title: 'Hey',
            description: `We also want to detect account from MetaMask extension and present just user specific data.
            Blockchain is slow compared to the user interactions and we don’t want user to sit and wait for the confirmations. That means it’s critical to implement transactions queue and enable user to see transaction status within Web Application or using tool like Etherscan.`,
            id: 4,
            state: 0 // 0 - inProgress, 1 - done
        }
    ]
    const state = useContext(StateContext)
    const [polls, setPolls] = useState(votes)
    const [invite, setInvite] = useState(false)
    const [vote, setVote] = useState(false)
    const [create, setCreate] = useState(false)
    const [id, setId] = useState(-1)
    const [copied, setCopy] = useState(false)
    const answers = ['agree', 'disagree', 'nd']
    const address = '0x8E5e0376922B04574D29F868E0a43761c5716056'

    const copy = () => {
        setCopy(true)
        navigator.clipboard.writeText(address)
        console.log(copied)
        setTimeout( () => setCopy(false), 1500)
    }
    // List of polls in which you are a voter
    // The number of polls in which you are a voter
    return (
        <Container className={classes.root}>
			<Grid container spacing={3}>
                <Grid item xs={12} key='header'>
                    <Paper
                        elevation={0}
                        className='paper header'>
                            List of polls created by you
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
                                <Typography>The number of polls you created: {polls.length}</Typography>
                            </div>
                    </Paper>
                </Grid>
                {polls.map(item => (
                    <Grid item xs={12} key={item.id}>
                        <Paper 
                            elevation={0}
                            className='paper'
                            >
                            <div className="caption">
                                <Typography className="title">{item.title}</Typography>
                                <Typography className="description">{item.description}</Typography>
                            </div>
                            {item.state === 0 ?
                            <div className='btn-group'>
                                <Button 
                                    color='primary'
                                    onClick={() => {setVote(true); setId(+item.id)}}>
                                    Vote
                                </Button>
                                <Button 
                                    color='primary'
                                    onClick={() => {setInvite(true); setId(+item.id)}}>
                                    Invite
                                </Button>
                                <Button color='primary'>
                                    End poll
                                </Button>
                            </div>:
                            <div className='results'>
                                {answers.map(ans => (
                                    <>
                                        <Typography>{ans !== 'nd' ? ans.charAt(0).toUpperCase() + ans.slice(1) : 'Not decided'}</Typography>
                                        <Box display="flex" alignItems="center">
                                            <Box width="90%" mr={2}>
                                            <LinearProgress variant="determinate" value={item.result[ans][1]} />
                                            </Box>
                                            <Box minWidth={35}>
                                            <Typography variant="body2" color="textSecondary">{item.result[ans][1]}% ({item.result[ans][0]})</Typography>
                                            </Box>
                                        </Box>
                                    </>
                                ))}
                            </div>
                            }
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <InviteForm id={1} open={invite} close={() => setInvite(false)}/>
            <CreateForm open={create} close={() => setCreate(false)}/>
            <VoteForm id={1} open={vote} close={() => setVote(false)}/>
        </Container>
    )
}

export default PollsList