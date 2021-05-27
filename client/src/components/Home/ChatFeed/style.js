import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Box, Badge } from '@material-ui/core';
import '../../.././App.css'
export const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
   
},
  friendbar: {
    width: '100%',
    height: '100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  centeralign: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  messages: {
    width: '100%',
    overflow: 'auto',
    height: 'calc(100vh - 200px)',
    backgroundColor: 'white',
  },
  message_avatar: {
  width: '100%',
  minHeight: 50,
  padding: 10,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  },
  theirmessage_box : {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start'
  },
  mymessage_box : {
    width: '100%',
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 10
  },
  message_time : {
  
     padding: 10,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  theirmessage_content: {
    maxWidth: '70%',
    height: '100%',
    minHeight: 35,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
    borderRadius: "17px",
    backgroundColor: '#d6dce5',
    fontFamily: 'Open Sans',
    wordBreak: 'break-word'
  },
  mymessage_content: {
    maxWidth: '70%',
    height: '100%',
    minHeight: 35,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    borderRadius: "17px",
    backgroundColor: '#8faadc',
    color: 'white',
    fontFamily: 'Open Sans',
    wordBreak: 'break-word'
  },
  message_image : {
    marginRight: 18,
    objectFit: 'cover',
    borderRadius: 6,
    height: '30vw',
    /* width: 30vw; */
    maxHeight: 200,
    maxWidth: 200,
    minHeight: 100,
    minWidth: 100,
  },
  message: {
  
    minHeight: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
 
  },
  textbox: {
    height: 100,
    backgroundColor: '#f2f2f2',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
 
  input: {
    backgroundColor: 'white',
  
  },
  chatfeed: {
    height: '100vh',
    backgroundColor: 'white',
    width: '50%'
  }
}));

export const StyledBox = withStyles({
  root: {

    borderColor: `#b2b2b2`,

  },
})(Box);
export const StyledBadge = withStyles((theme) => ({
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

export const StyledBadgeStatic =  withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  
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



