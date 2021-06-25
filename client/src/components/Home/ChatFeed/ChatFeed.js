import { makeStyles } from '@material-ui/core/styles';
import React, { useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getAllMessages, getPreMessages } from '../../../actions/chat';
import { SocketContext } from '../../../context.socket';
import FriendBar from './FriendBar';
import Messages from './Messages';
import TextBox from './TextBox';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    chatfeed: {
        height: '100vh',
        backgroundColor: '#dfe5ff',
        width: '50%',
       
    },
    chatfeedMD: {
        height: '100vh',
        backgroundColor: '#dfe5ff',
        width: '70%',
        minWidth: '550px'
         
    },
    chatfeedSM : {
        height: '100vh',
        backgroundColor: '#dfe5ff',
        width: 'calc(100% - 110px)',
    },
    chatfeedXS: {
        width: '100%'
    }
}));


const ChatFeed = ({ setSearchTerm }) => {
    console.log('CHAT FEED RENDER');

    const { mode } = useSelector(state => state.layout, shallowEqual);
    console.log(mode)
/*     const matchSM = useMediaQuery('(max-width: 1100px)');
    const match900 = useMediaQuery('(max-width: 900px)'); */

    const currentUserId = JSON.parse(localStorage.getItem('profile')).result._id;

    const conversation = useSelector(state => state.conversation);
    const userResult = useSelector(state => state.userResult);
    const lastMessage = useSelector(state => state.lastMessage);

    const classes = useStyles();
    const dispatch = useDispatch();
    const loadedMore = useRef(false)
    const socket = useContext(SocketContext);

    let currentFriend = {};

    if (conversation) {
        if (conversation.host) {
            currentFriend = conversation.hostInfo[0]
        }
        conversation?.peopleInfo?.forEach(person => {
            if (person._id !== currentUserId) {
                currentFriend = person;
            }
        })

    } else {
        currentFriend = userResult
    }

    useEffect(() => {
        if (lastMessage.sender != currentUserId) {
            socket.emit('getMessages', conversation?._id);
        }
    }, [lastMessage]);

    useEffect(() => {
        loadedMore.current = false;
    });

    useEffect(() => {
        socket.on('sendMessages', messages => {
            dispatch(getAllMessages(messages))
        })
    },[])

    useEffect(() => {
        socket.on('sendPreMessages', preMessages => {
            dispatch(getPreMessages(preMessages));
        })
    },[]);

    let css = '';
    switch(mode) {
        case 'MD':
            css = classes.chatfeedMD;
            break;
        case 'SM':
            css = classes.chatfeedSM;
            break;
        default:
            css = classes.chatfeed;
    }

    return (
        <div className={css}>
            <FriendBar friend={currentFriend} conversation={conversation} />
            <Messages loadedMore={loadedMore} />
            <TextBox conversation={conversation} friendId={currentFriend._id} setSearchTerm={setSearchTerm} />
        </div>
    )
}

export default React.memo(ChatFeed);