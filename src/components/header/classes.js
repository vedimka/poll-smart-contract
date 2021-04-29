import { makeStyles } from '@material-ui/core/styles'

const useClasses = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		'& .title': {
			marginLeft: 15
		}
	},

}))

export default useClasses