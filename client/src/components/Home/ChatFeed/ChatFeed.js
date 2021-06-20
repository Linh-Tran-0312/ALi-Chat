import { makeStyles } from '@material-ui/core/styles';
import React, { useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getAllMessages, getPreMessages } from '../../../actions/chat';
import { SocketContext } from '../../../context.socket';
import FriendBar from './FriendBar';
import Messages from './Messages';
import TextBox from './TextBox';
import CircularProgress from '@material-ui/core/CircularProgress';
 const useStyles = makeStyles((theme) => ({
    chatfeed: {
      height: '100vh',
      backgroundColor: '#dfe5ff',
      width: '50%'
    }
  }));
  

const  ChatFeed = ({ setSearchTerm }) => {
  
    const classes = useStyles();
    const dispatch = useDispatch();
    const loadedMore = useRef(false)
    const socket = useContext(SocketContext);
    const  conversation  = useSelector(state => state.conversation);
    const   userResult  = useSelector(state => state.userResult);
    const lastMessage = useSelector(state => state.lastMessage);
    const currentUserId = JSON.parse(localStorage.getItem('profile')).result._id;
    let currentFriend = {};
    
    if(conversation) {      
        if(conversation.host) {
            currentFriend = conversation.hostInfo[0]
        }
       conversation?.peopleInfo?.forEach(person => {
           if(person._id !== currentUserId) {
               currentFriend = person;
           }
       })

    } else {
        currentFriend = userResult
    }
    
    useEffect(() => {
        if(lastMessage.sender != currentUserId ) {
            socket.emit('getMessages', conversation?._id);
            console.log("get lai messages do co last message")
        }
      
    },[lastMessage]);
  
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
             
        })
    },[])
    console.log('chatfeed render')
    return(
        <div className={classes.chatfeed}>
            <FriendBar friend={currentFriend} groupName={conversation?.name}/>
             
                  <Messages  loadedMore={loadedMore} />
             
          
            <TextBox  conversation={conversation} friendId={currentFriend._id}  setSearchTerm={setSearchTerm} />
        </div>
    )
}

export default React.memo(ChatFeed);