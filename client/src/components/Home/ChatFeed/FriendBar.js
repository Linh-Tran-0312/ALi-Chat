import { Button, Grid, Box, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React from 'react';
import { useDispatch } from 'react-redux';
import { selectProfile } from '../../../actions/user';
import Avatar from '.././Avatar';
 
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
    }));
    

const FriendBar = ({friend, groupName }) => {
  console.log('friend bar render');
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleSelectProfile = () => {
       dispatch(selectProfile(friend));
    }
    return (

        <div className={classes.friendbar}>
            <StyledBox borderBottom={1} className={classes.container}>
                <Grid container  direction="row" justify="space-between" alignItems="center" >
                    <Grid item container xs={8}>
                        <Grid item xs={3} className={classes.centeralign}>                      
                                <Avatar size={55} type={1} url={groupName ? '/group-avatar.png' : friend.avatar} userId={friend._id}/>                         
                        </Grid>
                        <Grid item xs={7} container direction="row" justify="flex-start" alignItems="center">
                            <Grid item xs={12}><Typography variant="h5" color="primary" >{ groupName ? `${groupName}` :` ${friend.lastname} ${friend.firstname}`}</Typography></Grid>
                        </Grid>
                    </Grid>
                    {
                        groupName ? null : <Grid item xs={4} container direction="row" justify="flex-end" alignItems="center"><Button onClick={handleSelectProfile}><MoreHorizIcon  /></Button></Grid>

                    }
                </Grid>
            </StyledBox>

        </div>

    )
};

export default FriendBar;