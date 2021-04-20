import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

import useStyles from './classes'

const ListOfHomes = () => {
	let classes = useStyles()
	const [open, setOpen] = useState(false)
	const [nft, openNFT] = useState([false, ''])

	const handleClose = () => {
		setOpen(false)
		openNFT([false, ''])
	}

	const openDialog = () => {
		setOpen(true)
		setTimeout(() => {
			setOpen(false)
		}, 2000)
	}

	const openNftDialog = (text) => {
		setOpen(true)
		openNFT([true, text])
		console.log(text)
	}

	let object = {
		name: 'Superb Room for two',
		description: 'Cozy rooms of about 15 m², with a bed 150 x 190 cm, perfect for a business stay or for a trip for two in Paris. The bathrooms are equipped with a shower or bathtub according to the configuration of the room. Each room is equipped with a courtesy tray with a kettle (tea, coffee), a minibar, an individual safe, reading lights, a telephone, a flat screen TV with International and sports channels, WiFi and air conditioning. Some of our Classic rooms overlook a quiet courtyard, others the Victoria Avenue. All our toiletries are paraben, silicone and colorant-free. A complimentary baby cot can be put in the room if needed.',
	}
	return (
		<Container className={classes.root}>
			<Grid container spacing={3}>
				{
					[0, 1, 2, 4, 5, 6, 7].map(item => (
						<Grid item xs={12} key={item}>
							<Paper 
								elevation={3}
								className={classes.paper}
								>
								<div className="caption">
									<Typography className="title">{object.name}</Typography>
									<Typography className="description">{object.description}</Typography>
								</div>
							</Paper>
						</Grid>
					))
				}
			</Grid>
			<Dialog 
				onClose={handleClose} 
				aria-labelledby="simple-dialog-title" 
				open={open}
				>
      			{!nft[0] ?
				  	<>
						<DialogTitle id="simple-dialog-title">
							<CheckCircleOutlineIcon className={classes.dialog}/>
						</DialogTitle>
						<div className={classes.description}>
							You have successfully rented this apartment
						</div>
					</>:
					<div className={classes.nft}>
						{nft[1]}
						<DialogActions>
							<Button onClick={handleClose} color="primary" autoFocus>
								Close
							</Button>
						</DialogActions>
					</div>
				}
     		</Dialog>
		</Container>
	)
}

export default ListOfHomes