import { makeStyles } from '@material-ui/core/styles'

const useClasses = makeStyles(theme => ({
    root: {
        margin: 'auto',
        maxWidth: '90vw',
        width: 640,
        paddingBottom: 50,
        paddingTop: 50,
        '& .paper': {
            backgroundColor: '#fff',
            border: '1px solid #dadce0',
            borderRadius: 8,
            padding: 24,
            pageBreakInside: 'avoid',
            wordWrap: 'break-word',
            WebkitTransition: 'background-color 200ms cubic-bezier(0.0,0.0,0.2,1)',
            '& .title': {
                textAlign: 'center',
                fontSize: 30,
                justifyContent: 'space-between',
                marginBottom: 6,
            },
            '& .description': {
                fontSize: 16,
                color: '#2e2e2e',
            },
            '& .btn': {
                textAlign: 'right',
                margin: '15px 25px -10px',
                '& button': {
                    colot: '#575757',
                    backgroundColor: '#dc004e30',
                    borderRadius: 7,
                    padding: '6px 15px',
                    '&:hover': {
                        backgroundColor: '#dc004e50'
                    }
                }
            },
        },
    },
}))

export default useClasses