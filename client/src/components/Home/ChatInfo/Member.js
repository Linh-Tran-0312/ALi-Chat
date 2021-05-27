import { Avatar, Box, Grid, Typography } from '@material-ui/core';
import { ListItem, ListItemAvatar, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import { useStyle } from './style';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
const Member = ({person, isHost}) => {
    const classes = useStyle();
    console.log(isHost);
    return (
       /*  <Box width={1} my={2}>
            <Grid container>
                <Grid item xs={3} align="center">
                    <Avatar alt={person.firstname}src={person.avatar} />
                </Grid>
                <Grid item xs={9} container direction="row"
                    justify="flex-start"
                    alignItems="center">
                    <Typography variant="body1">{`${person.firstname} ${person.lastname}`}</Typography>
                </Grid>
            </Grid>
        </Box> */
          <ListItem  alignItems="center">
          <ListItemAvatar>
              <Avatar url="/DSC_0913.jpg" width="50" height="50" isOnline />
          </ListItemAvatar>
          <ListItemText 
                  primary={`${person.lastname} ${person.firstname}`} /> 
                  {
                      isHost ?  <VpnKeyIcon color="primary" fontSize="small" /> : null
                  }                    
      </ListItem>
    )
};

export default Member;