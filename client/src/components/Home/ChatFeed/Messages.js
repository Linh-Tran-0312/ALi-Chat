import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../../context.socket.js';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage.js';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    messages: {
      width: '100%',
      overflow: 'auto',
      height: 'calc(100vh - 200px)',
      backgroundColor: 'white',
    }
   
  }));
  

const Messages = ({ loadedMore}) => {
    console.log('messages render')
    const currentUserId = JSON.parse(localStorage.getItem('profile')).result._id;
    const [ isLoading, setIsLoading] = useState(false); 
    
  
    const classes = useStyles();
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
         if(chatTop.current.scrollTop === 0 && messages.length >= 10 && messages[0].isFirst == false) {
             loadMessages(); 
             setIsLoading(true);          
         } 
    }

    useEffect(() => {
        setIsLoading(false);
        if(!loadedMore.current ) {
           return scrollToBottom()
        } else {
           return scrollToPoint()
        }
       }
    ,[messages]);  

    const renderMessages = () => {
       return (messages.map((message, index )=> {
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
        )
    }

    return(
        <div className={classes.messages} onScroll={myFunction} ref={chatTop}>
         {
             isLoading && (
                 <Box width={1} textAlign="center">
                            <CircularProgress />
                 </Box>
             )
         }
         
         {   
              !messages || messages.length === 0?  <CircularProgress /> :  renderMessages()
         }
         
            <div ref={chatBottom} />
        </div>
    )
};

export default React.memo(Messages);