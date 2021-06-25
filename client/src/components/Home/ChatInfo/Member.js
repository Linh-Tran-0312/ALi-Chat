import { IconButton, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import React from 'react';
import Avatar from '.././Avatar';


const Member = ({ person, hostId, removeMember }) => {
    const userId = JSON.parse(localStorage.getItem('profile')).result._id;

    const isHost = person._id == hostId;
    const userIsHost = userId == hostId;

    const handleKickMember = () => {
        removeMember(person._id);
    }

    return (
        <ListItem alignItems="center">
            <ListItemAvatar>
                <Avatar url={person.avatar} size={50} type={2} userId={person._id} />
            </ListItemAvatar>
            <ListItemText
                primary={`${person.lastname} ${person.firstname}`} />
            {
                isHost ? <VpnKeyIcon color="primary" fontSize="small" /> : userIsHost ? <IconButton onClick={handleKickMember}><ExitToAppIcon color="primary" fontSize="small" /></IconButton> : null
            }
        </ListItem>
    )
};

export default Member;