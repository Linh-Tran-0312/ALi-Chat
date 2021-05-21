import { ListItem, ListItemAvatar, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import Avatar from '../Avatar';

const useStyle = makeStyles(() => ({
    conversation: {
        height: 80,
        minWidth: 200,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: '#dfe5ff',
            cursor: 'pointer'
        },
        '& .MuiListItemText-primary': {
            color: '#5B9BD5',
            fontWeight: 'bold',
            fontSize: '20px',
            marginLeft: 5
        },
        '& .MuiListItemText-secondary': {
            marginLeft: 5
        }
    },
    icon: {
        diplay: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bold: {
        '& .MuiListItemText-secondary': {
            fontWeight: 'bold'
        }
    }
}))

const Conversation = ({ conversation, selectConversation, user, selectUserResult, isSearchResult }) => {
    const classes = useStyle();
    const currentUserId = JSON.parse(localStorage.getItem('profile')).result._id;
    let name, lastMessage
    if(conversation) {
        const partner = conversation?.peopleInfo?.find(x => x._id !== currentUserId);
        name = `${partner.firstname} ${partner.lastname}`
    if(conversation?.lastMessageInfo[0]?.text.length < 40) {
         lastMessage = conversation?.lastMessageInfo[0]?.text
    } else {
        lastMessage = conversation?.lastMessageInfo[0]?.text;
        lastMessage = lastMessage?.substring(0,40)
        lastMessage =`${lastMessage}...`
    }
    }
    const handleSelect = () => {
        if (conversation) {
            selectConversation(conversation);

        }
        if (user) {

            selectUserResult(user);
        }
    }
    if (!isSearchResult) {
        return (
            <ListItem onClick={handleSelect} className={classes.conversation} alignItems="center">
                <ListItemAvatar>
                    <Avatar url="/DSC_0913.jpg" width="50" height="50" isOnline />
                </ListItemAvatar>
                <ListItemText 
                        primary={name} 
                        secondary={lastMessage} />
                <FiberManualRecordIcon color="primary" fontSize="small" />
            </ListItem>
        )
    }
    return (

        <ListItem onClick={handleSelect} className={classes.conversation} alignItems="center">
            <ListItemAvatar>
                <Avatar url="/DSC_0913.jpg" width="50" height="50" />
            </ListItemAvatar>
            {
                user ? (
                    <>
                        <ListItemText primary={`${user.lastname} ${user.firstname}`} />
                        <ListItemIcon className={classes.icon}>
                            <FiberNewIcon fontSize="large" color="primary" />
                        </ListItemIcon>
                    </>
                ) : (
                    <>
                        <ListItemText primary={name} />                     
                    </>
                )}

        </ListItem>
    )
}

export default Conversation