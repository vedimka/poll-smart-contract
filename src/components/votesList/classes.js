import { makeStyles } from '@material-ui/core/styles'

const useClasses = makeStyles(theme => ({
    root: {
        margin: 'auto',
        maxWidth: '90vw',
        width: 640,
    },
    paper: {
        backgroundColor: '#fff',
        border: '1px solid #dadce0',
        borderRadius: 8,
        // marginBottom: 8,
        padding: 24,
        pageBreakInside: 'avoid',
        wordWrap: 'break-word',
        WebkitTransition: 'background-color 200ms cubic-bezier(0.0,0.0,0.2,1)',
        '& .title': {
            fontSize: 25,
            justifyContent: 'space-between',
            marginBottom: 6,
            // Webkit-box-pack: justify;
        },
        '& .description': {
            fontSize: 14,
            color: '#2e2e2e',
        }
    }
}))

export default useClasses