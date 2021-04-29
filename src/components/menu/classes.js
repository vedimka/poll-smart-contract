import { makeStyles } from '@material-ui/core/styles'

const useClasses = makeStyles((theme) => ({
    root: {
        maxWidth: 428,
        margin: '15px auto'
    },
	menuItem: {
		minWidth: 25,
        textTransform: 'none',
		'& .icon': {
            margin: '4px 3px 0 0',
        //     margin: 'auto',
		// 	display: 'block',
			// maxWidth: 25,
			'& svg': {
				width: 20,
				height: 20
			}
		}
	},

}))

export default useClasses