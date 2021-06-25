
import { makeStyles } from '@material-ui/core/styles';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getAllConversations } from '../../../actions/chat';
import { searchFriends } from '../../../actions/user';
import { SocketContext } from '../../../context.socket';
import Conversations from './Conversations';
import UserBar from './UserBar';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    chatlist: {
        height: '100vh',
        backgroundColor: 'white',
        width: '25%',
        minWidth: 350
    },
    chatlistSM: {
        height: '100vh',
        backgroundColor: 'white',
        width: '110px', 
    },
    chatlistXS: {
        height: '100vh',
        backgroundColor: 'white',
        width: '100%', 
    }
}));


const ChatList = ({ searchTerm, setSearchTerm }) => {
    console.log('CHAT LIST RENDER');
    const { mode } = useSelector(state => state.layout, shallowEqual);
    /* const match900 = useMediaQuery('(max-width: 900px)'); */

    const userId = JSON.parse(localStorage.getItem('profile')).result._id;

    const lastMessage = useSelector(state => state.lastMessage, shallowEqual);
    const conversation = useSelector(state => state.conversation,shallowEqual);

    let isFetch = false;

    const dispatch = useDispatch();
    const socket = useContext(SocketContext);
    const classes = useStyles();

    useEffect(() => {
        socket.emit('getMessages', conversation?._id);
        console.log("get lai messages do conversation change")
    }, [conversation?._id]);

    useEffect(() => {
        const formData = { searchTerm }
        if (searchTerm) {
            dispatch(searchFriends(formData));
        }
    }, [searchTerm]);

    useEffect(() => {
        socket.emit('getConversations', userId)
    }, [lastMessage]);

    useEffect(() => {
        socket.on('sendConversations', conversations => {
            console.log("get conversations", conversations?.length)
            dispatch(getAllConversations(conversations));
        })
    }, []);

    const handleSearchTerm = (formData) => {
        setSearchTerm(formData.searchTerm);
    }

    return (
        <div className={ mode === 'SM' ? classes.chatlistSM : classes.chatlist}>
            <UserBar
                handleSearchTerm={handleSearchTerm}
                searchTerm={searchTerm}
            />
            <Conversations searchTerm={searchTerm} />
        </div>
    )
};

export default ChatList