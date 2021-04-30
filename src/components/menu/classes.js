import { makeStyles } from '@material-ui/core/styles'

const useClasses = makeStyles((theme) => ({
    root: {
		// width: '18%',
        // maxWidth: '18%',
		display: 'flex',
        margin: '15px 0',
		justifyContent: 'center',

		'& .menuItem': {
			minWidth: 25,
			textTransform: 'none',
			'& .icon': {
				margin: '4px 3px 0 0',
				'& svg': {
					width: 20,
					height: 20
				}
			},
		},
		'& .menuItem.active': {
			backgroundColor: '#00000020'
		}
    },

}))

export default useClasses