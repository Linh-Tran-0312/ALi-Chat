
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { searchFriends } from '../../../actions/user';
import { emitGetMessages } from '../socket';
import Conversations from './Conversations';
import UserBar from './UserBar';
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
    },
    hidden : {
        display: 'none'
    }
}));


const ChatList = ({ searchTerm, setSearchTerm }) => {
    console.log('CHAT LIST RENDER');
    const { mode, view } = useSelector(state => state.layout, shallowEqual);

    const conversation = useSelector(state => state.conversation,shallowEqual);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        emitGetMessages(conversation?._id);
        console.log("get lai messages do conversation change")
    }, [conversation?._id]);

    useEffect(() => {
        const formData = { searchTerm }
        if (searchTerm) {
            dispatch(searchFriends(formData));
        }
    }, [searchTerm]);

    const handleSearchTerm = (formData) => {
        setSearchTerm(formData.searchTerm);
    }

    let css = '';
    switch(mode) {
        case 'XS':
            css = classes.chatlistXS;
            break;
        case 'SM':
            css = classes.chatlistSM;
            break;
        default:
            css = classes.chatlist;
    }
    const isHidden = view.CHATLIST && view.CHATFEED && mode === 'XS';
    return (
        <div className={isHidden ? classes.hidden : css}>
            <UserBar
                handleSearchTerm={handleSearchTerm}
                searchTerm={searchTerm}
            />
            <Conversations searchTerm={searchTerm} />
        </div>
    )
};

export default ChatList