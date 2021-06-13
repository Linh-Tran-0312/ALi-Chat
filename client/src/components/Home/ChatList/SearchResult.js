import { ListItem, ListItemAvatar, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import React from 'react';
import { useDispatch } from 'react-redux';
import { selectConversation } from '../../../actions/chat';
import { selectUserResult } from '../../../actions/user';
import Avatar from '../Avatar';

const useStyles = makeStyles(() => ({
    conversation: {
        height: 80,
        minWidth: 200,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: '#dfe5ff',
            cursor: 'pointer'
        },
        '& .MuiListItemText-primary': {
            color: '#5B9BD5',
            fontWeight: 'bold',
            fontSize: '20px',
            marginLeft: 5
        },
        '& .MuiListItemText-secondary': {
            marginLeft: 5
        }
    },
    icon: {
        diplay: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bold: {
        '& .MuiListItemText-secondary': {
            fontWeight: 'bold'
        }
    },
    selected : {
        backgroundColor: '#dfe5ff'
    }

}))

const SearchResult = ({ user}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    let name ="" ;
    if(user.conversation) {
      name = user.conversation.name ? user.conversation.name : `${user.lastname} ${user.firstname}`
     }
    else {
         name = `${user.lastname} ${user.firstname}`;
    }
  
    
    const handleSelect = () => {
        if (user.conversation) {
            dispatch(selectConversation(user.conversation));
        }
        else {
            dispatch(selectUserResult(user));
        }
    }
  
    return (

        <ListItem onClick={handleSelect} className={classes.conversation} alignItems="center">
            <ListItemAvatar>
                <Avatar url={user.avatar} width="50" height="50" />
            </ListItemAvatar>
            {
                !user.conversation ? (
                    <>
                        <ListItemText primary={name} />
                        <ListItemIcon className={classes.icon}>
                            <FiberNewIcon fontSize="large" color="primary" />
                        </ListItemIcon>
                    </>
                ) : (
                    <>
                        <ListItemText primary={name} />                     
                    </>
                )}

        </ListItem>
    )
}

export default SearchResult