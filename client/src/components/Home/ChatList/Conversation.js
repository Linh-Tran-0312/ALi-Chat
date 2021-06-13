import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectConversation } from '../../../actions/chat';
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

}));
const Conversation = ({ conversation }) => {
    const classes = useStyles();
    const currentUser = JSON.parse(localStorage.getItem('profile')).result;
    const currentConversation = useSelector(state => state.conversation);
    const dispatch = useDispatch();
    let name ="" ;
    let lastMessage ="" ;
    let  partner = conversation.peopleInfo?.find(x => x._id !== currentUser._id);
    const isGroupConversation = conversation.name ? true : false 
    const lastMessageSender = conversation?.lastMessageInfo[0]?.senderInfo[0];
    if(isGroupConversation) {
        name = conversation.name
       
    } else {
        
        name = ` ${partner.lastname} ${partner.firstname}`;
    }
    
       
    if(!conversation.lastMessageInfo[0]?.text && !conversation.lastMessageInfo[0]?.attachment) {
        lastMessage = currentUser._id === conversation.host ? `You have created a group chat !` : `${conversation.hostInfo[0]?.lastname} has recently added you`
       
    }
    else if (conversation.lastMessageInfo[0].attachment) {
        lastMessage = currentUser._id === conversation.lastMessageInfo[0].sender ? `You have sent an image` : ( isGroupConversation ? `${lastMessageSender.firstname} have sent an image` : "Sent an image" );
    }
    else {
        if(conversation?.lastMessageInfo[0]?.text.length < 30) {
            lastMessage = currentUser._id === conversation.lastMessageInfo[0].sender ? `You: ${conversation?.lastMessageInfo[0]?.text}` :   ( isGroupConversation ? `${lastMessageSender.firstname}: ${conversation?.lastMessageInfo[0]?.text}` : conversation?.lastMessageInfo[0]?.text ) ;
       } else {
           lastMessage = conversation?.lastMessageInfo[0]?.text;
           lastMessage = lastMessage?.substring(0,30)
           lastMessage =`${lastMessage}...`;
           lastMessage = currentUser._id === conversation.lastMessageInfo[0].sender ? `You: ${lastMessage}` : ( isGroupConversation ? `${lastMessageSender.firstname}: ${lastMessage}` : lastMessage ) ;
       }
    }
  
    const handleSelect = () => {
            dispatch(selectConversation(conversation));    
    }
    
        return (
            <ListItem onClick={handleSelect} className={currentConversation?._id !== conversation._id ? classes.conversation : `${classes.conversation} ${classes.selected}`} alignItems="center">
                <ListItemAvatar>
                    <Avatar url={conversation.people.length === 2 ? partner.avatar : '/group-avatar.png'} width="50" height="50" isOnline />
                </ListItemAvatar>
                <ListItemText 
                        primary={name} 
                        secondary={lastMessage} />
                <FiberManualRecordIcon color="primary" fontSize="small" />
            </ListItem>
        )
    
  
}

export default Conversation