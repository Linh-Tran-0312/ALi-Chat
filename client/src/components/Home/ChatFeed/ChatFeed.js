import React, { useContext, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getAllMessages, getPreMessages } from '../../../actions/chat';
import { SocketContext } from '../../../context.socket';
import FriendBar from './FriendBar';
import Messages from './Messages';
import { useStyle } from './style';
import TextBox from './TextBox';

const  ChatFeed = ({ setSearchTerm }) => {
  
    const classes = useStyle();
    const dispatch = useDispatch();
    const loadedMore = useRef(false)
    const socket = useContext(SocketContext);
    const conversation = useSelector(state => state.conversation);
    const userResult = useSelector(state => state.userResult);
    const currentUserId = JSON.parse(localStorage.getItem('profile')).result._id;
    let currentFriend = {};
    
    if(conversation) {      
       conversation?.peopleInfo?.forEach(person => {
           if(person._id !== currentUserId) {
               currentFriend = person;
           }
       })

    } else {
        currentFriend = userResult
    }
    
  
    useEffect(() => {
        loadedMore.current = false;
    })

    useEffect(() => {
        socket.on('sendMessages', messages => {
            dispatch(getAllMessages(messages))
        })
    },[])    

    useEffect(() => {
        socket.on('sendPreMessages', preMessages => {
            dispatch(getPreMessages(preMessages));
            console.log(preMessages.length);
        })
    },[])
console.log('chatfeed render')
    return(
        <div className={classes.chatfeed}>
            <FriendBar friend={currentFriend} groupName={conversation.name}/>
            <Messages  loadedMore={loadedMore} />
            <TextBox conversationId={conversation._id} friendId={currentFriend._id}  setSearchTerm={setSearchTerm} />
        </div>
    )
}

export default React.memo(ChatFeed);