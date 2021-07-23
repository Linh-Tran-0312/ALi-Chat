import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import FriendBar from './FriendBar';
import Messages from './Messages';
import TextBox from './TextBox';

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

    const currentUserId = JSON.parse(localStorage.getItem('profile')).result._id;

    const conversation = useSelector(state => state.conversation, shallowEqual);
    const userResult = useSelector(state => state.userResult, shallowEqual);

    const classes = useStyles();

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

    let css = '';
    switch(mode) {
        case 'XS':
            css = classes.chatfeedXS;
            break;
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
            <FriendBar friend={currentFriend} conversation={conversation}  />
            <Messages  conversation={conversation}  />
            <TextBox   friendId={currentFriend?._id} setSearchTerm={setSearchTerm} conversation={conversation} />
        </div>
    )
}

export default React.memo(ChatFeed);