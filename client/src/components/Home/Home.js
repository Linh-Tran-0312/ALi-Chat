import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLastMessage, selectConversation } from '../../actions/chat';
import { SocketContext } from '../../context.socket';
import AppWall from './AppIntro/AppWall';
import ChatFeed from './ChatFeed/ChatFeed';
import ChatInfo from './ChatInfo/ChatInfo';
import ChatList from './ChatList/ChatList';
import { useStyle } from './style';


const Home = () => {
    const user = JSON.parse(localStorage.getItem('profile')).result;
 
    const [ searchTerm, setSearchTerm ] = useState("");

    const lastMessage = useSelector(state => state.lastMessage)
    const conversation = useSelector(state => state.conversation)
    const profile = useSelector(state => state.profile);
    const userResult = useSelector(state => state.userResult);

    const classes = useStyle();
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);

   useEffect(() => {
     dispatch({type: "SET_PROFILE", payload: user})
   },[])

    useEffect(() => {
        socket.emit('join', user._id);
    },[]);
    
    useEffect(() => {       
        socket.emit('join-conversation', conversation._id)
    },[conversation]);

    useEffect(() => {
        socket.on('message',data => { 
            if(data.conversation && data.message.sender === user._id) {
                setSearchTerm("");
                dispatch(selectConversation(data.conversation));
            }             
            dispatch(getLastMessage(data.message));                  
        })
    },[socket]);

    console.log('Home render')
    useEffect(() => {
        socket.emit('getConversations', user._id)
    },[lastMessage])
 
    useEffect(() => {
        socket.emit('getMessages', conversation._id)
    },[conversation, lastMessage])
    return (
        
        <div className={classes.container}>
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