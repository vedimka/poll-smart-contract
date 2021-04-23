import { makeStyles } from '@material-ui/core/styles'

const useClasses = makeStyles(theme => ({
    root: {
        '& .MuiPaper-root': {
            // backgroundColor: '#fff',
            zIndex: 5,
            minWidth: 300,
            border: '1px solid #dadce0',
            borderRadius: 8,
            padding: 12,
            pageBreakInside: 'avoid',
            wordWrap: 'break-word',
            WebkitTransition: 'background-color 200ms cubic-bezier(0.0,0.0,0.2,1)',
        }
    },
}))

export default useClasses