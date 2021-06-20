import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';

const StyledBadge1 = withStyles((theme) => ({
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
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);
const StyledBadge2 = withStyles((theme) => ({
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


const AvatarIcon = ({ url, size, type, userId }) => {

   const onlineUsers = useSelector(state => state.onlineUsers)
   let isOnline = onlineUsers.some(user => user.userId === userId);

   

  if (isOnline) {
    if(type === 1)
    return (
      <div>
        <StyledBadge1
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          variant="dot"
        >
          <Avatar src={url} style={{ width: `${size}px`, height: `${size}px` }} />
        </StyledBadge1>
      </div>
    )
    return (
      <div>
      <StyledBadge2
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant="dot"
      >
        <Avatar src={url} style={{ width: `${size}px`, height: `${size}px` }} />
      </StyledBadge2>
    </div>
    )
  }
  return (
    <Avatar src={url} style={{ width: `${size}px`, height: `${size}px` }} />
  )
};

export default AvatarIcon;
