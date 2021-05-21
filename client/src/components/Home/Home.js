import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLastMessage } from '../../actions/chat';
import { SocketContext } from '../../context.socket';
import AppWall from './AppIntro/AppWall';
import ChatFeed from './ChatFeed/ChatFeed';
import ChatInfo from './ChatInfo/ChatInfo';
import ChatList from './ChatList/ChatList';
import { useStyle } from './style';


const Home = () => {
    const userId = JSON.parse(localStorage.getItem('profile')).result._id;
    const [ conversation, setConversation ] = useState("");
    const [ profile, setProfile ] = useState("");
    const [ userResult, setUserResult ] = useState("");

 
    const [ searchTerm, setSearchTerm ] = useState("");

    const lastMessage = useSelector(state => state.lastMessage)
    
    const classes = useStyle();
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);
 

    const selectConversation = (currentConversation) => {
        console.log(currentConversation._id)
        setConversation(currentConversation);
        setProfile("");
        setUserResult("");
    }
    const selectProfile = (user) => {       
        setProfile(user);  
        setConversation("");
        setUserResult("")
    }
    const selectUserResult = (user) => {
        setUserResult(user);
        setConversation("");
        setProfile("");   
       /*  dispatch(getMessages("")); */
    }
    const hideYourScreen = () => {
        setConversation("");
        setUserResult("");
        setProfile("");
    }
 
     
    useEffect(() => {
        socket.emit('join', userId)
    },[]);
    
    useEffect(() => {       
        socket.emit('join-conversation', conversation._id)
    },[conversation]);

    useEffect(() => {
        socket.on('message',data => {             
            dispatch(getLastMessage(data.message));
            if(data.conversation) {
                selectConversation(data.conversation);
            }          
        })
    },[socket]);
    useEffect(() => {
        socket.on('sendNewConversation', newConversation => {
            selectConversation(newConversation)
        })
    })
    useEffect(() => {
        socket.emit('getConversations', userId)
    },[lastMessage])
 
    useEffect(() => {
        socket.emit('getMessages', conversation._id)
    },[conversation, lastMessage])
    return (
        
        <div className={classes.container}>
                <ChatList
                    selectConversation={selectConversation} 
                    selectProfile={selectProfile} 
                    selectUserResult={selectUserResult}
                    hideYourScreen={hideYourScreen}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                                 
                />
        {
            (!conversation && !userResult) ? (
                <AppWall profile={profile} />
            ) : (
                <>
                <ChatFeed                  
                    conversation={conversation} 
                    userResult={userResult} 
                    setSearchTerm={setSearchTerm} 
                               
                    selectProfile={selectProfile}
                />
                <ChatInfo conversation={conversation}/>
                </> 
                
            )
        }
        </div>
        
    )
}

export default Home;