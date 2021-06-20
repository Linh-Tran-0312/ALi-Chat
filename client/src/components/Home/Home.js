import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getLastMessage, selectConversation, updateMessages, updateNotifyMessage } from '../../actions/chat';
import { updateOnlineUsers } from '../../actions/user';
import { SocketContext } from '../../context.socket';
import AppWall from './AppIntro/AppWall';
import ChatFeed from './ChatFeed/ChatFeed';
import ChatInfo from './ChatInfo/ChatInfo';
import ChatList from './ChatList/ChatList';
import { useStyle } from './style';
import CircularProgress from '@material-ui/core/CircularProgress';
import conversations from '../../reducers/conversations';

const Home = () => {
    
    const user = JSON.parse(localStorage.getItem('profile')).result;
    
    const [ searchTerm, setSearchTerm ] = useState("");

    const   conversation   = useSelector(state => state.conversation);
   // const  lastMessage  = useSelector(state => state.lastMessage);
    const profile = useSelector(state => state.profile)
    const userResult = useSelector(state => state.userResult);
      
    const classes = useStyle();
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);

   useEffect(() => {
   
     dispatch({type: "SET_PROFILE", payload: user})
   },[])

    useEffect(() => {
        socket.emit('join', user?._id);
    },[user]);
    
    useEffect(() => {
        socket.connect();
    },[user]);

    useEffect(() => {       
        socket.emit('join-conversation', conversation?._id)
    },[conversation]);

    useEffect(() => {
        socket.on('message',data => { 
            // neu tin nhan ve la tin nhac dau tien do user gui den 1 nguoi moi
            if(data.conversation && data.message.sender === user?._id) {
                setSearchTerm("");
                dispatch(selectConversation(data.conversation));
            }  
           console.log('dispatch get last message');
            dispatch(getLastMessage(data.message));  
            if(data.message.sender === user?._id) {
                dispatch(updateMessages(data.message));    
            }
                      
        })
    },[]);

    console.log('Home render')
   /*  useEffect(() => {
        socket.emit('getConversations', user?._id)
    },[lastMessage]);
 */
    useEffect(() => {
        socket.on('loadConversationsAgain', () => {
            socket.emit('getConversations', user?._id)
        })
    },[]);
    // Khi server add memmber thanh cong thi tra ve conversaion da update va message thong bao
    useEffect(() => {
        socket.on('SucceedInAddMember', response => {
            dispatch(selectConversation(response.conversation));
            dispatch(updateNotifyMessage(response.message))
        })
    },[])
    // Khi server xoa member
    useEffect(() => {
        socket.on('SucceedInRemoveMember', response => {
            if(response.removedId === user?._id) {
                socket.emit('getConversations', user?._id);
                dispatch(selectConversation(null));
            } else {
                dispatch(selectConversation(response.conversation));
                dispatch(updateNotifyMessage(response.message))
            }
        })
    },[])
   useEffect(() => {
       socket.on('sendOnlineUsers', users => {
           dispatch(updateOnlineUsers(users))
       })
    },[]);  

    useEffect(() => {   
     return(() => {
        socket.disconnect();
     })            
    },[]);  

    return (
        
        <div className={classes.container}>
            {
                conversations.length == 0
            }
                <ChatList searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {
            (!conversation && !userResult) ? (
                <AppWall profile={profile} />
            ) : (
                <>
                <ChatFeed setSearchTerm={setSearchTerm} />
                <ChatInfo/>
                </> 
                
            )
        }
        </div>
        
    )
}

export default Home;