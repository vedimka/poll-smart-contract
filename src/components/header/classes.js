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
	}
}))

export default useClasses