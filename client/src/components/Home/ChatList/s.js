
import { TextField, Badge } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
export const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
 
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
       
    },
    chatlist : {
       height: '100vh',
       backgroundColor: '#f2f2f2',
       width: '25%'
     
   },
  conversationlist : {
    width: '100%',
    overflow: 'auto',
    maxHeight: 'calc(100vh - 250px)',
    backgroundColor: 'white'
  },
    conversation: {
    height: 80,   
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
        backgroundColor: '#dfe5ff',
        cursor: 'pointer'
    },
    color : 'blue'
    },
    centeralign : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
   userinfo : {
    width: '100%',
    height: '250px',
    backgroundColor: '#edf4ff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
   },
   input: {
    background: "white",
    borderRadius: 20,
  },
  inputStyle : { 
    "&:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 1000px white inset"
  } }
}));

export const  StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(1)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }))(Badge);

 
export const BorderTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: `20px`,
       
      },
 
    }
  }
})(TextField);