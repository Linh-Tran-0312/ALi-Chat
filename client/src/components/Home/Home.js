import React, { useContext, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLastMessage, selectConversation, updateMessages, updateConversationAfterMemberChange, isRemovedFromGroup } from '../../actions/chat';
import { changeScreen } from '../../actions/layout';
import { updateOnlineUsers } from '../../actions/user';
import { SocketContext } from '../../context.socket';
import AppWall from './AppIntro/AppWall';
import ChatFeed from './ChatFeed/ChatFeed';
import ChatInfo from './ChatInfo/ChatInfo';
import ChatList from './ChatList/ChatList';
import { useStyle } from './style';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// Create custom hook to save previous conversation

const usePrevious = (data) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = data
    },[data])
    return ref.current;
}


const Home = () => {
    console.log('HOME RENDER');

    const matchLG = useMediaQuery('(min-width:1101px)');
    const matchMD = useMediaQuery('(max-width:1100px)');
    const matchSM = useMediaQuery('(max-width:900px)');
    const matchXS = useMediaQuery('(max-width:640px)');

    
    const user = JSON.parse(localStorage.getItem('profile')).result;

    const [searchTerm, setSearchTerm] = useState("");

    const { view } = useSelector(state => state.layout);
    const conversation = useSelector(state => state.conversation);
  /*   const profile = useSelector(state => state.profile)
    const userResult = useSelector(state => state.userResult); */

    let preConversationId = usePrevious(conversation?._id);

    const classes = useStyle();
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);

    useEffect(() => {
        dispatch({ type: "SET_PROFILE", payload: user });
    }, [])

    useEffect(() => {
        socket.connect();
    }, [user]);

    useEffect(() => {
        socket.emit('join', user?._id);
    }, [user]);

    useEffect(() => {
        socket.emit('join-conversation',{ newConversation: conversation?._id, oldConversation: preConversationId});
        console.log('change room')
    }, [conversation]);

    useEffect(() => {
        socket.on('message', data => {
            if (data.conversation && data.message.sender === user?._id) {
                setSearchTerm("");
                dispatch(selectConversation(data.conversation));
            }
            dispatch(getLastMessage(data.message));
            if (data.message.sender === user?._id) {
                dispatch(updateMessages(data.message));
            }
        })
    }, []);

    useEffect(() => {
        socket.on('updateUserReadMessage', data => {
             
                socket.emit('getMessages', data.conversationId);
   
        })
    },[])

    useEffect(() => {
        socket.on('loadConversationsAgain', () => {
            socket.emit('getConversations', user?._id)
        })
    }, []);

    // When server add a member to the conversation successfully
    useEffect(() => {
        socket.on('SucceedInAddMember', response => {  
            dispatch(updateConversationAfterMemberChange(response))
        })
    }, []);

    // When server remove a member to the conversation successfully
    useEffect(() => {
        socket.on('SucceedInRemoveMember', response => {
            if (response.removedId === user?._id) {
                socket.emit('getConversations', user?._id);
                dispatch(isRemovedFromGroup());    
            } else {
                dispatch(updateConversationAfterMemberChange(response))
            }
        })
    }, [])

    // Server send list of online users
    useEffect(() => {
        socket.on('sendOnlineUsers', users => {
            dispatch(updateOnlineUsers(users))
        })
    }, []);

    useEffect(() => { 
        if(matchLG) dispatch(changeScreen('LG'));
        if(matchMD) dispatch(changeScreen('MD'));
        if(matchSM) dispatch(changeScreen('SM'));
        if(matchXS) dispatch(changeScreen('XS'));
    },[matchMD,matchSM ,matchXS, matchLG]);

    useEffect(() => {
        return (() => {
            socket.disconnect();
        })
    }, []);

    return (

       
        <div className={classes.container}>
            {
                view.CHATLIST && <ChatList searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }  
            {
                view.INTRO &&   <AppWall />
            }       
            {             
                view.CHATFEED &&  <ChatFeed setSearchTerm={setSearchTerm} />
            }
            {
                view.CHATINFO && <ChatInfo />
            }           
        </div>

    )
}

export default Home;