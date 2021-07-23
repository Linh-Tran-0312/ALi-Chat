import { Box, Button, Drawer, IconButton, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { backToChatList, viewChatInfo } from '../../../actions/layout';
import { selectProfile } from '../../../actions/user';
import Avatar from '../../../components/Avatar';
import ChatInfo from '../ChatInfo/ChatInfo';

const StyledBox = withStyles({
  root: {
    borderColor: `white`,
  },
})(Box);

const useStyles = makeStyles(() => ({
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
    backgroundColor: '#b8d0e5'
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
  root: {
    marginTop: 30
  },
  content_box: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    color: '#d8d8d8'
  },
  info_box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: 'white'
  },
  menu_box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  linebreak1: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: 'calc(100vw - 200px)',
  },
  linebreak2: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: 'calc(100vw - 300px)',
  }
}));


const InfoDrawer = () => {

  const [state, setState] = React.useState(false);
  const toggleDrawer = (value) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(value);
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}><MoreHorizIcon style={{ color: 'white' }} /></IconButton>
      <Drawer anchor={'right'} open={state} onClose={toggleDrawer(false)}>
        <ChatInfo />
      </Drawer>
    </div>
  );
}

const FriendBar = ({ conversation, friend }) => {
  console.log('FriendBar render');
  const { mode } = useSelector(state => state.layout, shallowEqual);
  const matchMD = mode === 'MD';
  const matchSM = mode === 'SM';
  const matchXS = mode === 'XS';
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSelectProfile = () => {
    dispatch(selectProfile(friend));
  }
  const handleOpenChatInfo = () => {
    dispatch(viewChatInfo());
  }
  const handleBackToChatList = () => {
    dispatch(backToChatList())
  }
  return (
    <div className={classes.friendbar}>
      <StyledBox borderBottom={1} className={classes.container}>
        <Box className={classes.content_box} >
          <Box className={classes.info_box}>
            {
              matchXS && <Button onClick={handleBackToChatList}  ><FormatListBulletedIcon style={{ color: 'white' }} /></Button>
            }
            {
              !conversation?.name ? matchXS ? <Avatar url={friend?.avatar} size={40} type={1} userId={friend?._id} /> : <Avatar url={friend?.avatar} size={55} type={1} userId={friend?._id} /> : null
            }
            <Box width={1} mx={1} >
              {
                matchXS ? <Typography variant="h6" color="inherit" className={conversation?.name ? classes.linebreak1 : classes.linebreak2} >{conversation?.name ? `${conversation?.name}` : `${friend?.firstname}`}</Typography>
                  : <Typography variant="h5" color="inherit" className={classes.linebreak1}>{conversation?.name ? `${conversation.name}` : ` ${friend?.lastname} ${friend?.firstname}`}</Typography>
              }
            </Box>
          </Box>
          {
            <Box className={classes.menu_box}>
              {
                !conversation?.name && <Button onClick={handleSelectProfile}  ><AccountCircleIcon style={{ color: 'white' }} /></Button>
              }
              {
                (matchMD || matchSM) && <InfoDrawer />
              }
              {
                matchXS && <Button onClick={handleOpenChatInfo}  ><MoreHorizIcon style={{ color: 'white' }} /></Button>
              }
            </Box>
          }
        </Box>
      </StyledBox>
    </div>
  )
};

export default FriendBar;