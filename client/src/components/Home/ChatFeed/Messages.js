import React, { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../../context.socket.js';
import MyMessage from './MyMessage';
import { useStyle } from './style';
import TheirMessage from './TheirMessage.js';

const Messages = ({ loadedMore}) => {
  
    const currentUserId = JSON.parse(localStorage.getItem('profile')).result._id;
     
    console.log('messages render')

    const classes = useStyle();
    const messages = useSelector(state => state.messages);
    const chatBottom = useRef(null);
    const chatTop = useRef(null);
    const chatPoint = useRef(null); //null
   
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
        loadedMore.current = true;
        console.log("Ham loadMessage run")
        }
      
    }
    const myFunction = () => {
         if(chatTop.current.scrollTop === 0 && messages.length >= 10 ) {
             loadMessages();           
         } 
    }

    useEffect(() => {
        if(!loadedMore.current ) {
           return scrollToBottom()
        } else {
           return scrollToPoint()
        }
       }
    ,[messages]);  


    return(
        <div className={classes.messages} onScroll={myFunction} ref={chatTop}>
         
         {            
             messages.map((message, index )=> {
               if(message.text || message.attachment) {
                const nextMessage = index === messages.length ? null : messages[index+1];
                const isLastMessage = index === messages.length - 1 ? true : false
                if(message.sender === currentUserId) {
                    if(index == 10) return <MyMessage key={index}  forwardRef={chatPoint}  isLastMessage={isLastMessage} message={message}/>;
                    return <MyMessage key={index} isLastMessage={isLastMessage}   message={message}/>
                }
                else {
                    if(index == 10) return <TheirMessage key={index} isLastMessage={isLastMessage} forwardRef={chatPoint} nextMessage={nextMessage} message={message}/>;
                    return <TheirMessage key={index} isLastMessage={isLastMessage} nextMessage={nextMessage} message={message}/>
                }
               }             
            })
         }
         
            <div ref={chatBottom} />
        </div>
    )
};

export default React.memo(Messages);