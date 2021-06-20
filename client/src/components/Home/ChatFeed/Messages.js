import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector,useDispatch , shallowEqual } from 'react-redux';
import { SocketContext } from '../../../context.socket.js';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { setIsLoadingMore } from '../../../actions/chat';
import NotifyMessage from './NotifyMessage.js';

const useStyles = makeStyles((theme) => ({
    messages: {
      width: '100%',
      overflow: 'auto',
      height: 'calc(100vh - 182px)',
      backgroundColor: '#f2f4ff',
      '&::-webkit-scrollbar': {
        width: '5px',
        
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: '#f2f4ff'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#b7bcd4',
        borderRadius: '5px'
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#555',
      }
      
    }
   
  }));
  

const Messages = ({ loadedMore}) => {
    console.log('messages render')
    const currentUserId = JSON.parse(localStorage.getItem('profile')).result._id;
     
    const dispatch = useDispatch();
  
    const classes = useStyles();
    const  userResult = useSelector(state => state.userResult);
    console.log(userResult);
    const { messages, isLoadingMore, isSent } = useSelector(state => state.messages);
    console.log(isLoadingMore);
 
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
        dispatch(setIsLoadingMore(true));     
        console.log("Ham loadMessage run")
        }
      
    }
    const myFunction = () => {
         if(chatTop.current.scrollTop === 0 && messages.length >= 10 && messages[0].isFirst == false) {
             loadMessages(); 
                 
         } 
    }

    useEffect(() => {
        //setIsLoading(false);
        if(!loadedMore.current || isSent) {
           return scrollToBottom()
        } else {
           return scrollToPoint()
        }
       }
    ,[messages]);  

    const renderMessages = () => {
       return (messages.map((message, index )=> {
         if(message.isNotify) {
          if(index == 10) return <NotifyMessage key={index} type="face" forwardRef={chatPoint} color="primary" message={message}/>;
          return <NotifyMessage key={index} type="face" color="primary" message={message}/>
     
         } else {
          if(message.text || message.attachment) {
            const nextMessage = index === messages.length ? null : messages[index+1];
            const isLastMessage = index === messages.length - 1 ? true : false
            if(message.sender === currentUserId) {
                if(index == 10) return <MyMessage key={index}  forwardRef={chatPoint}  isLastMessage={isLastMessage} nextMessage={nextMessage} message={message}/>;
                return <MyMessage key={index} isLastMessage={isLastMessage} nextMessage={nextMessage}  message={message}/>
            }
            else {
                if(index == 10) return <TheirMessage key={index} isLastMessage={isLastMessage} forwardRef={chatPoint} nextMessage={nextMessage} message={message}/>;
                return <TheirMessage key={index} isLastMessage={isLastMessage} nextMessage={nextMessage} message={message}/>
            }
           } 
         }                     
         }) 
        )
    }

    return(
        <div className={classes.messages} onScroll={myFunction} ref={chatTop}>
         {
             isLoadingMore  ? (
                 <Box width={1} mt={2} textAlign="center">
                            <CircularProgress />
                 </Box>
             ) : null
         }
         
         {   
               messages.length === 0 && !userResult ?  <Box width={1} textAlign="center" ><CircularProgress /></Box> :  renderMessages()
         }
         
            <div ref={chatBottom} />
        </div>
    )
};

export default React.memo(Messages);