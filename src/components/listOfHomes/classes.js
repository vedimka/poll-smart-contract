import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '30px auto'
    },
    paper: {
        display: 'flex',
        padding: theme.spacing(2),
        minHeight: 50,
        color: theme.palette.text.secondary,
        '& img': {
            width: 300,
            height: 'auto',
            maxHeight: 500,
            borderRadius: 7,
            marginRight: 15
        },
        '& .caption': {
            maxWidth: '40%',
            '& .title': {
                color: '#000',
                fontSize: '1.25em',
            },
            '& .description': {
                fontSize: '0.9em'
            }
        },
        '& .amenities': {
            marginLeft: 25,
            '& .title': {
                color: '#000',
                fontSize: '1.1em',
            },
            '& .item': {
                color: '#333333',
                margin: '5px 0'
            }
        },
        '& .info': {
            display: 'grid',
            '& .descr': {
                top: '155%',
                position: 'relative',
                left: '20%',
                '& p': {
                    fontSize: '0.75em'
                }
            },
            '& .btnGroup': {
                marginLeft: 30,
            },
            '& button': {
                margin: 5,
                top: '60%'
            }
        }
    },
    dialog: {
        color: 'green',
        minWidth: 200,
        fontSize: '5em'
    },
    description: {
        padding: 5,
        textAlign: 'center',
        maxWidth: 230,
        marginBottom: 20
    },
    nft: {
        padding: 20,
    },
    nftTitle: {
        font: 'bold',
        fontSize: '1.2em'
    },
    content: {
        marginBottom: 10
    }

}))

export default useStyles