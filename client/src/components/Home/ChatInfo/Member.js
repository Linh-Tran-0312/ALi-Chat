import { IconButton, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import React, { useState, useEffect } from 'react';
import Avatar from '.././Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(() => ({
    listitem : {
        '& .MuiListItemText-primary': {
            color: '#5B9BD5',       
            fontSize: '15px',
            marginLeft: 5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        },
    }
}))
const Member = ({ person, hostId, removeMember }) => {
    const userId = JSON.parse(localStorage.getItem('profile')).result._id;
    const [ isRemoving, setIsRemoving ] = useState(false);
    const isHost = person._id == hostId;
    const userIsHost = userId == hostId;
    const classes = useStyles();
    const handleKickMember = () => {
        removeMember(person._id);
        setIsRemoving(true);
    }

    useEffect(() => {
        setIsRemoving(false);
    },[person])

    return (
        <ListItem alignItems="center" className={classes.listitem}>
            <ListItemAvatar>
                <Avatar url={person.avatar} size={50} type={2} userId={person._id} />
            </ListItemAvatar>
            <ListItemText
                primary={`${person.lastname} ${person.firstname}`} />
            {
                isHost ? <VpnKeyIcon color="primary" fontSize="small" /> : userIsHost ? <IconButton onClick={handleKickMember}>{ isRemoving ? <CircularProgress color="primary" size={20}/> : <ExitToAppIcon color="primary" fontSize="small" />}</IconButton> : null
            }
        </ListItem>
    )
};

export default Member;