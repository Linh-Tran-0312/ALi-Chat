import { Box, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Radium, { StyleRoot } from 'radium';
import React, { useEffect, useRef, useState } from 'react';
import { headShake } from 'react-animations';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { setIsLoadingMore, readNewMessage } from '../../../actions/chat';
import { emitGetPreMessages } from '../socket.js';
import MyMessage from './MyMessage';
import NotifyMessage from './NotifyMessage.js';
import TheirMessage from './TheirMessage.js';
import TypingMessage from './TypingMessage';
const useStyles = makeStyles((theme) => ({
  messages_container: {
    position: 'relative',
    height: 'calc(100vh - 182px)',
  },
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
    },
    position: 'absolute'
  },
  scrolldown: {
    position: 'absolute',
    left: '50%',
    bottom: 10,
    transform: 'translateX(-50%)',
    zIndex: 10,
  }

}));

const styles = {
  headShake: {
    animation: 'x 1s',
    animationName: Radium.keyframes(headShake, 'headShake')
  }
}


const Messages = ({ conversation }) => {

  const currentUserId = JSON.parse(localStorage.getItem('profile')).result._id;

  const userResult = useSelector(state => state.userResult);
  const { messages, isLoadingMore, scrollMode, newMessage, typing } = useSelector(state => state.messages, shallowEqual);

  const [scrollDown, setScrollDown] = useState(false);
  

  const dispatch = useDispatch();
  const classes = useStyles();

  const chatBottom = useRef(null);
  const chatTop = useRef(null);
  const chatPoint = useRef(null);

  const scrollToBottom = () => {
    chatBottom.current.scrollIntoView();
  };

  const scrollToPoint = () => {
    chatPoint?.current?.scrollIntoView();
  }

  const loadMessages = () => {
    if (messages.length >= 10) {
      emitGetPreMessages({ conversationId: messages[0].conversation, time: messages[0].createdAt });
      dispatch(setIsLoadingMore(true));
    }
  }

  let isFarFromBottom;
  const scrollFunction = () => {
    if (chatTop.current.scrollTop === 0 && messages.length >= 10 && messages[0].isFirst == false) {
      loadMessages();
    }

    // display scroll down button when user scroll up or there is a new message
    let messagesHeight = chatTop?.current?.scrollHeight;
    let messagesTop = chatTop?.current?.scrollTop;
    let clientHeight = chatTop?.current.clientHeight;
    isFarFromBottom = messagesHeight - messagesTop > clientHeight + 100;

    if (scrollDown !== isFarFromBottom) {
      setScrollDown(isFarFromBottom);
      if (!scrollDown) {
        dispatch(readNewMessage())
      }
    }
  }

  useEffect(() => {
    switch (scrollMode) {
      case 1:
        scrollToBottom();
        break;
      case 2:
        scrollToPoint();
      default:
        break;
    }
  }, [messages]);

  const renderMessages = () => {
    return (messages.map((message, index) => {
      if (message.isNotify) {
        return <NotifyMessage key={index} type="face" forwardRef={index === 10 ? chatPoint : null} color="primary" message={message} />
      } else {
        if (message.text || message.attachment) {
          const nextMessage = index === messages.length ? null : messages[index + 1];
          const isLastMessage = index === messages.length - 1 ? true : false
          if (message.sender === currentUserId) {
            return <MyMessage key={index} forwardRef={index === 10 ? chatPoint : null} isLastMessage={isLastMessage} nextMessage={nextMessage} message={message} />;
          }
          else {
            return <TheirMessage key={index} isLastMessage={isLastMessage} forwardRef={index === 10 ? chatPoint : null} nextMessage={nextMessage} message={message} />;
          }
        }
      }
    }))
  }

  return (
    <div className={classes.messages_container}>
      <div className={classes.messages} onScroll={scrollFunction} ref={chatTop}>
        {
          isLoadingMore ? (
            <Box width={1} my={2} textAlign="center" ><PulseLoader color={"#5B9BD5"} size={13} css={"margin-bottom: 25px"} loading={true} /></Box>
          ) : null
        }
        {
          messages.length === 0 && !userResult ? <Box width={1} my={2} textAlign="center" ><PulseLoader color={"#5B9BD5"} size={13} css={"margin-bottom: 25px"} loading={true} /></Box> : renderMessages()
        }
        {
          currentUserId !== typing?._id && typing ? <TypingMessage avatar={typing?.avatar} userId={typing?._id} /> : null
        }
        <div ref={chatBottom} />
      </div>
      <div className={classes.scrolldown} >
        {
          scrollDown ? newMessage ?
            <StyleRoot>
              <div style={styles.headShake}>
                <Chip
                  label='New Message'
                  color="primary"
                  onClick={scrollToBottom}
                />
              </div>
            </StyleRoot>
            : <Chip
              avatar={<ArrowDownwardIcon />}
              label='Scroll Down'
              onClick={scrollToBottom}
            /> : null
        }
      </div>
    </div>
  )
};

export default React.memo(Messages);