import React, { useState, useEffect, useContext } from 'react'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

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
        }
    ]
    const state = useContext(StateContext)
    const [list, setList] = useState(votes)

    // useEffect(() => {
    //     if(typeOfList === 'owner'){
    //         setList(state.ownerPoll)
    //     } else if(typeOfList === 'voter'){
    //         setList(state.partPoll)
    //     } else {

    //     }
    // }, [])

    return (
        <Container className={classes.root}>
			<Grid container spacing={3}>
                {list.map(item => (
                    <Grid item xs={12} key={item.id}>
                        <Paper 
                            elevation={0}
                            className={classes.paper}
                            >
                            <div className="caption">
                                <Typography className="title">{item.title}</Typography>
                                <Typography className="description">{item.description}</Typography>
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <InviteForm/>
        </Container>
    )
}

export default PollsList