import React from 'react';
import { useDispatch } from 'react-redux';
import { ListItem, ListItemAvatar, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import Avatar from '../Avatar';
import { selectConversation } from '../../../actions/chat';
import { selectUserResult } from '../../../actions/user';
import { useSelector } from 'react-redux';
const useStyle = makeStyles(() => ({
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

const Conversation = ({ conversation,  user, isSearchResult }) => {
    const classes = useStyle();
    const currentUser = JSON.parse(localStorage.getItem('profile')).result;
    const currentConversation = useSelector(state => state.conversation);
    const dispatch = useDispatch();
    let name ="" ;
    let lastMessage ="" ;
    if(conversation) {
        const partner = conversation.peopleInfo?.find(x => x._id !== currentUser._id);
        name = `${partner.firstname} ${partner.lastname}`;
        name = conversation.name ? conversation.name : name;
       
    if(!conversation.lastMessageInfo[0]?.text && !conversation.lastMessageInfo[0]?.attachment) {
        lastMessage = currentUser._id === conversation.host ? `You have created a group chat !` : `${conversation.hostInfo[0]?.lastname} has currently added you`
        console.log(conversation.hostInfo);
    }
    else if (conversation.lastMessageInfo.attachment) {
        lastMessage = currentUser._id === conversation.lastMessageInfo.sender ? `You: have sent an image` : 'Sent an image'
    }
    else {
        if(conversation?.lastMessageInfo[0]?.text.length < 35) {
            lastMessage = currentUser._id === conversation.lastMessageInfo[0].sender ? `You: ${conversation?.lastMessageInfo[0]?.text}` :  conversation?.lastMessageInfo[0]?.text ;
       } else {
           lastMessage = conversation?.lastMessageInfo[0]?.text;
           lastMessage = lastMessage?.substring(0,35)
           lastMessage =`${lastMessage}...`;
           lastMessage = currentUser._id === conversation.lastMessageInfo[0].sender ? `You: ${lastMessage}` : `${lastMessage}`
       }
    }
  
    }
    const handleSelect = () => {
        if (conversation) {
            dispatch(selectConversation(conversation));
        }
        if (user) {
            dispatch(selectUserResult(user));
        }
    }
    if (!isSearchResult) {
        return (
            <ListItem onClick={handleSelect} className={currentConversation?._id !== conversation._id ? classes.conversation : `${classes.conversation} ${classes.selected}`} alignItems="center">
                <ListItemAvatar>
                    <Avatar url="/DSC_0913.jpg" width="50" height="50" isOnline />
                </ListItemAvatar>
                <ListItemText 
                        primary={name} 
                        secondary={lastMessage} />
                <FiberManualRecordIcon color="primary" fontSize="small" />
            </ListItem>
        )
    }
    return (

        <ListItem onClick={handleSelect} className={classes.conversation} alignItems="center">
            <ListItemAvatar>
                <Avatar url="/DSC_0913.jpg" width="50" height="50" />
            </ListItemAvatar>
            {
                user ? (
                    <>
                        <ListItemText primary={`${user.lastname} ${user.firstname}`} />
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

export default Conversation