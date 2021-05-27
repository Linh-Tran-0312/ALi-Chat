import { Avatar, Button, Grid, Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React from 'react';
import { StyledBadge, StyledBox, useStyle } from './style';
import { selectProfile } from '../../../actions/user';
import { useDispatch } from 'react-redux';


const FriendBar = ({friend, groupName }) => {
    const classes = useStyle();
    const dispatch = useDispatch();

    const handleSelectProfile = () => {
       dispatch(selectProfile(friend));
    }
    return (

        <div className={classes.friendbar}>
            <StyledBox borderBottom={4} className={classes.container}>
                <Grid container  direction="row" justify="space-between" alignItems="center" >
                    <Grid item container xs={8}>
                        <Grid item xs={3} className={classes.centeralign}>
                            <StyledBadge
                                overlap='circle'
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                variant="dot"
                            >
                                <Avatar style={{ width: '55px', height: '55px' }} src={friend.avatar} />
                            </StyledBadge>
                        </Grid>
                        <Grid item xs={7} container direction="row" justify="flex-start" alignItems="center">
                            <Grid item xs={12}><Typography variant="h4" color="primary" fontWeight="fontWeightBold">{ groupName ? `${groupName}` :` ${friend.lastname} ${friend.firstname}`}</Typography></Grid>
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