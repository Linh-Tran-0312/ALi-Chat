import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import React from 'react';
import Avatar from '.././Avatar';
 

const Member = ({person, isHost}) => {
     
    return (
          <ListItem  alignItems="center">
          <ListItemAvatar>
              <Avatar url={person.avatar} width="50" height="50" isOnline />
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