import { makeStyles } from '@material-ui/core/styles';

const useClasses = makeStyles((theme) => ({
    body: {
        marginTop:80,   
    },
    loader: {
        zIndex: 1301,
        color: '#b0b9eb',
        backgroundColor: '#080a17bb'
    }
}))

export default useClasses