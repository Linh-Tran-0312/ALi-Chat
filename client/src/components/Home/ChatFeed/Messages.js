import React, { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../../context.socket.js';
import MyMessage from './MyMessage';
import { useStyle } from './style';
import TheirMessage from './TheirMessage.js';

const Messages = ({ loadMore, setLoadMore}) => {
  
    const currentUserId = JSON.parse(localStorage.getItem('profile')).result._id;
     

    const classes = useStyle();
    const messages = useSelector(state => state.messages);
    const chatBottom = useRef(null);
    const chatTop = useRef(null);
    const chatPoint = useRef(loadMore.chatPoint); //null
    const loaded = useRef(loadMore.loaded) // false
    const socket = useContext(SocketContext);

    const scrollToBottom = () => {
        chatBottom.current.scrollIntoView();
      };
    const scrollToPoint = () => {    
        chatPoint?.current?.scrollIntoView();       
    }
    const loadMessages = () => {
        if(messages.length >= 10) {
            socket.emit('getPreMessages', { conversationId: messages[0].conversation, time: messages[0].createdAt});
        loaded.current = true;
        }
      
    }
    const myFunction = () => {
         if(chatTop.current.scrollTop === 0) {
             loadMessages();
             console.log("Ham loadMessage run")
         } 
    }

    useEffect(() => {
        if(!loaded.current) {
           return scrollToBottom()
        } else {
           return scrollToPoint()
        }
       }
    ,[messages])

    
    return (
        <div className={classes.messages} onScroll={myFunction} ref={chatTop}>
            {
                messages.map((message, index )=> {
                    if(message.sender === currentUserId) {
                        if(index == 10) return <MyMessage key={index}  forwardRef={chatPoint} message={message}/>;
                        return <MyMessage key={index}  message={message}/>
                    }
                    else {
                        if(index == 10) return <TheirMessage key={index}  forwardRef={chatPoint}  message={message}/>;
                        return <TheirMessage key={index} message={message}/>
                    }
                })
            }
           <div ref={chatBottom} />
        </div>

    )
};

export default Messages;