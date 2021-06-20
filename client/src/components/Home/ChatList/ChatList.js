
import { makeStyles } from '@material-ui/core/styles';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllConversations } from '../../../actions/chat';
import { searchFriends } from '../../../actions/user';
import { SocketContext } from '../../../context.socket';
import Conversations from './Conversations';
import UserBar from './UserBar';

 const useStyles = makeStyles((theme) => ({ 
    chatlist : {
       height: '100vh',
       backgroundColor: 'white',
       width: '25%'     
   } 
}));


const ChatList = ({ searchTerm, setSearchTerm}) => {
    
    const userId = JSON.parse(localStorage.getItem('profile')).result._id;
    const lastMessage = useSelector(state => state.lastMessage);
    const conversation = useSelector(state => state.conversation);
    const conversations = useSelector(state => state.conversations);
    let isFetch = false;

    const dispatch = useDispatch();
    const socket = useContext(SocketContext);
    const classes = useStyles();
    useEffect(() => {   
        socket.emit('getMessages', conversation?._id);
        console.log("get lai messages do conversation change")
},[conversation?._id]); 

    useEffect(() => {
        const formData = { searchTerm }
        if(searchTerm) {
            dispatch(searchFriends(formData));
        }
    },[searchTerm]);

    useEffect(() => {
        socket.emit('getConversations', userId)
    },[lastMessage]);

    useEffect(() => {
        socket.on('sendConversations', conversations => { 
            console.log("get conversations", conversations.length)
            dispatch(getAllConversations(conversations));
        })
    },[]);  


  console.log('chatlist render')
   
    const handleSearchTerm = (formData) => {
        setSearchTerm(formData.searchTerm);      
    }

    return (
        <div className={classes.chatlist}>
           <UserBar 
            handleSearchTerm={handleSearchTerm}
            searchTerm={searchTerm}
            />     
           <Conversations  searchTerm={searchTerm}/>
        </div>
    )
};

export default ChatList