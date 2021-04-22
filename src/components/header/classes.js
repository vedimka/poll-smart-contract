import { makeStyles } from '@material-ui/core/styles'

const useClasses = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	menuItem: {
		minWidth: 250,
		paddingLeft: 22,
		
		'& .icon': {
			display: 'block',
			minWidth: 35,
			'& svg': {
				width: 20,
				height: 20
			}
		}
	},
	emp: {
		minWidth: 250,
		paddingLeft: 22,
		height: 0,
		'&:hover': {
			backgroundColor: '#fff'
		}
	},
	curPage: {
		minWidth: 250,
		paddingLeft: 22,
		backgroundColor: '#d6d6d6',
		'& .icon': {
			display: 'block',
			minWidth: 35,
			'& svg': {
				width: 20,
				height: 20
			}
		},
		'&:hover': {
			backgroundColor: '#bfbfbf'
		}
	},
	logout: {
		position: 'absolute',
		bottom: 10,
		
	},

}))

export default useClasses