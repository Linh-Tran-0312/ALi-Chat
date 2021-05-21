import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    submit : {
       padding: theme.spacing(1),    
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
      

    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    avatar: {
        margin: theme.spacing(3),
        backgroundColor: theme.palette.secondary.main,
    },
    colorBlue: {
        color: '#20c5dd',
        fontStyle: 'italic'
    }

}))