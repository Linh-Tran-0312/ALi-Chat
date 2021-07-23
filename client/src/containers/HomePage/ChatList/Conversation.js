import { Avatar as OAvatar, Box, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectConversation } from '../../../actions/chat';
import Avatar from '../../../components/Avatar';
import { emitUserReadLastMessage } from '../socket';
 
const useStyles = makeStyles(() => ({
    conversation: {
        height: 80,
        minWidth: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: '#e0f1fb',
            cursor: 'pointer',
            borderRadius: '5px',
        },
        '& .MuiListItemText-primary': {
            color: '#5B9BD5',       
            fontSize: '15px',
            marginLeft: 5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        },
        '& .MuiListItemText-secondary': {
            marginLeft: 5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        }
    },
    icon: {
        diplay: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    newSec: {      
        fontWeight: 'bold', 
    },
    newPri : {
         
        fontWeight: 'bold !important', 
    },
    selected: {
       
      /*   backgroundColor: '#e0f1fb', */
        backgroundColor: '#f2f4ff',
        borderRadius: '5px',
    },
}));

 
const Conversation = ({ conversation }) => {

    const { mode } = useSelector(state => state.layout);
     
    const currentUser = JSON.parse(localStorage.getItem('profile')).result;

    const [isRead, setIsRead] = useState(conversation?.lastMessageInfo[0]?.isReadBy?.some(readerId => readerId === currentUser?._id));
    const currentConversation = useSelector(state => state.conversation);

    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        setIsRead(conversation?.lastMessageInfo[0]?.isReadBy?.some(readerId => readerId === currentUser._id));
        if (currentConversation?._id === conversation?._id) {
            emitUserReadLastMessage({ conversationId: conversation?._id, messageId: conversation.lastMessageInfo[0]._id, userId: currentUser?._id });
            setIsRead(true);
        }
    }, [conversation])

    let name = "";
    let lastMessage = "";
    let partner = conversation.peopleInfo?.find(x => x._id !== currentUser._id);

    const isGroupConversation = conversation.name ? true : false
    const lastMessageSender = conversation?.lastMessageInfo[0]?.senderInfo[0] || '';

    if (isGroupConversation) {
        name = conversation.name;
    } else {
        name = ` ${partner.lastname} ${partner.firstname}`;
    }

    if (!conversation.lastMessageInfo[0]?.text && !conversation.lastMessageInfo[0]?.attachment) {
        lastMessage = currentUser._id === conversation.host ? `You have created a group chat !` : `${conversation.hostInfo[0]?.lastname} has recently added you`
    }
    else if (conversation.lastMessageInfo[0].attachment) {
        lastMessage = currentUser._id === conversation.lastMessageInfo[0].sender ? `You have sent an image` : (isGroupConversation ? `${lastMessageSender.firstname} have sent an image` : "Sent an image");
    }
    else {
        lastMessage = currentUser._id === conversation.lastMessageInfo[0].sender ? `You: ${conversation?.lastMessageInfo[0]?.text}` : (isGroupConversation ? `${lastMessageSender.firstname}: ${conversation?.lastMessageInfo[0]?.text}` : conversation?.lastMessageInfo[0]?.text);
    }

    const handleSelect = () => {
        if (!isRead) {
            emitUserReadLastMessage({ conversationId: conversation?._id, messageId: conversation.lastMessageInfo[0]._id, userId: currentUser?._id });
            setIsRead(true);
        }
        if(conversation._id !== currentConversation?._id || !currentConversation ) {
            dispatch(selectConversation(conversation));
        }
    }

    if(mode === 'SM') {
        return(
            <ListItem onClick={handleSelect} className={currentConversation?._id !== conversation._id ? classes.conversation : `${classes.conversation} ${classes.selected}`} alignItems="center">
            <ListItemAvatar>
                <Box>
                {
                    !isRead ? <FiberNewIcon style={{ fontSize: 20, color: '#f64141', position: 'relative', top: 13, right: 13}}/> : null 
                }
                {
                    !conversation?.name ?  <Avatar url={partner.avatar} size={50} type={1} userId={partner._id} /> :
                    (
                        <AvatarGroup  max={2} spacing={23}>
                            {
                                <OAvatar key={'a'} src={conversation?.hostInfo[0]?.avatar}/>
                            }
                            {
                                conversation?.peopleInfo.map((member, index) => {if(member._id !== conversation.host) return <OAvatar key={index} src={member.avatar} /> })
                            }    
                        </AvatarGroup>
                    )
                }
                </Box>   
            </ListItemAvatar>         
        </ListItem>
        )
    }

    return (
        <ListItem onClick={handleSelect} className={currentConversation?._id !== conversation._id ? classes.conversation : `${classes.conversation} ${classes.selected}`} alignItems="center">
            <ListItemAvatar>
                {
                    !conversation?.name ?  <Avatar url={partner.avatar} size={50} type={1} userId={partner._id} /> :
                    (
                        <AvatarGroup  max={2} spacing={25}>
                            {
                                <OAvatar src={conversation?.hostInfo[0]?.avatar}/>
                            }
                            {
                                conversation?.peopleInfo.map((member, index) => {if(member._id !== conversation.host) return <OAvatar key={index} src={member.avatar} /> })
                            }    
                        </AvatarGroup>
                    )
                }
            </ListItemAvatar>
            <ListItemText
                primary={name}
                secondary={lastMessage} 
                classes={{secondary: !isRead ? classes.newSec : null, primary:!isRead ? classes.newPri : null }}
                />
        </ListItem>
    )
}

export default Conversation;