import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllMessages, getPreMessages } from '../../../actions/chat';
import { SocketContext } from '../../../context.socket';
import FriendBar from './FriendBar';
import Messages from './Messages';
import { useStyle } from './style';
import TextBox from './TextBox';

const  ChatFeed = ({ conversation, userResult, selectProfile, setSearchTerm }) => {
  
    const classes = useStyle();
    const dispatch = useDispatch();
    const [ loadMore, setLoadMore ] = useState({ loaded: false, chatPoint: null})
    const socket = useContext(SocketContext);
    const currentUserId = JSON.parse(localStorage.getItem('profile')).result._id;
    let currentFriend = {};
    
    if(conversation) {      
       conversation.peopleInfo.forEach(person => {
           if(person._id !== currentUserId) {
               currentFriend = person;
           }
       })

    } else {
        currentFriend = userResult
    }

    useEffect(() => {
     setLoadMore(({ loaded: false, chatPoint: null}))
    },[conversation])

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

    return(
        <div className={classes.chatfeed}>
            <FriendBar friend={currentFriend} selectProfile={selectProfile}/>
            <Messages  loadMore={loadMore} setLoadMore={setLoadMore}/>
            <TextBox conversationId={conversation._id} friendId={currentFriend._id}  setSearchTerm={setSearchTerm} />
        </div>
    )
}

export default ChatFeed;