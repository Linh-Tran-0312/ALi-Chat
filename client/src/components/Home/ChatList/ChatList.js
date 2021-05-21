
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllConversations } from '../../../actions/chat';
import { searchFriends } from '../../../actions/user';
import { SocketContext } from '../../../context.socket';
import Conversations from './Conversations';
import { useStyle } from './style';
import UserBar from './UserBar';

const ChatList = ({ selectConversation, selectProfile, selectUserResult, hideYourScreen, searchTerm, setSearchTerm, newConversation }) => {
    
    const userId = JSON.parse(localStorage.getItem('profile')).result._id;
    const lastMessage = useSelector(state => state.lastMessage);

    let isFetch = false;

    const dispatch = useDispatch();
    const socket = useContext(SocketContext);
    const classes = useStyle();
    useEffect(() => {
        const formData = { searchTerm }
        if(searchTerm) {
            dispatch(searchFriends(formData));
        }
    },[searchTerm])

    useEffect(() => {
        socket.on('sendConversations', conversations => { 
            console.log("get conversations")
            dispatch(getAllConversations(conversations));
        })
    },[]);  
    
  
   
    const handleSearchTerm = (formData) => {
        setSearchTerm(formData.searchTerm);      
    }

    return (
        <div className={classes.chatlist}>
           <UserBar 
            selectProfile={selectProfile} 
            handleSearchTerm={handleSearchTerm}
            hideYourScreen={hideYourScreen}
            searchTerm={searchTerm}
            />     
           <Conversations selectConversation={selectConversation} searchTerm={searchTerm} selectUserResult={selectUserResult}/>
        </div>
    )
};

export default ChatList