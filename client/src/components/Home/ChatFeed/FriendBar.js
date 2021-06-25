import { Button, Grid, Box, Typography, Avatar as OAvatar, Drawer, IconButton, useMediaQuery } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { selectProfile } from '../../../actions/user';
import Avatar from '.././Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import ChatInfo from '../ChatInfo/ChatInfo';
const StyledBox = withStyles({
  root: {
    borderColor: `white`,
  },
})(Box);

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  friendbar: {
    width: '100%',
    height: '80px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#e5eaff'
  },
  centeralign: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ava2: {
    position: 'relative',
    top: -55,
    left: 15,
    zIndex: 0
  },
  root : {
    marginTop: 30
  }
}));


const  InfoDrawer = () => {
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const toggleDrawer = (value) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(value);
  };

  return (
    <div>
          <IconButton onClick={toggleDrawer(true)}><MoreHorizIcon style={{color: 'white'}}/></IconButton>
          <Drawer  anchor={'right'} open={state} onClose={toggleDrawer(false)}>
            <ChatInfo />
          </Drawer>
 
    </div>
  );
}

const FriendBar = ({ friend, conversation }) => {
  console.log('FriendBar render');
/*   const matchSM = useMediaQuery('(max-width: 1100px)'); */
  const { mode } = useSelector(state => state.layout, shallowEqual);
  const matchMD = mode === 'MD';
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSelectProfile = () => {
    dispatch(selectProfile(friend));
  }
  return (
    <div className={classes.friendbar}>
      <StyledBox borderBottom={1} className={classes.container}>
        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item container xs={8}>
            <Grid item xs={3} className={classes.centeralign}>
            {
                    !conversation?.name ?  <Avatar url={friend.avatar} size={55} type={1} userId={friend._id} /> : (
                      <Avatar url='./logoAli.png' size={60} type={2}  />
                    )
                }
            </Grid>
            <Grid item xs={7} container direction="row" justify="flex-start" alignItems="center">
              <Grid item xs={12}><Typography variant="h5" color="primary" >{conversation?.name ? `${conversation.name}` : ` ${friend.lastname} ${friend.firstname}`}</Typography></Grid>
            </Grid>
          </Grid>
          {
            <Grid item xs={4} container direction="row" justify="flex-end" alignItems="center">
              {
                  conversation?.name ? matchMD ? <InfoDrawer /> : null : !matchMD ?  <Button onClick={handleSelectProfile}><AccountCircleIcon style={{color: 'white'}} /></Button> : 
                  <>
                  <Button onClick={handleSelectProfile}  ><AccountCircleIcon style={{color: 'white'}}/></Button>
                  <InfoDrawer />
                  </>
              }
            
            
              </Grid>

          }
        </Grid>
      </StyledBox>
    </div>
  )
};

export default FriendBar;