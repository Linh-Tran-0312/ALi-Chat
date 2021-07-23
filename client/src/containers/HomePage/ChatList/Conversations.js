import { Box, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { useEffect, useRef } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { emitJoinConversation } from '../socket';
import Conversation from './Conversation';
import SearchResult from './SearchResult';
const useStyles = makeStyles(() => ({
  conversationlist: {
    width: '100%',
    overflow: 'auto',
    textAlign: 'center',
    height: 'calc(100vh - 250px)',
    backgroundColor: 'white',
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#e7eff4'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#cbd7df',
      borderRadius: '20px'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#555',
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    padding: 10,
    height: 70,
  }
}))

const ConversationSkeleton = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Box ml={1} mr={1}>
        <Skeleton variant="circle" width={50} height={50} />
      </Box>
      <Box mx={1} my={1} >
        <Skeleton animation="wave" height={12} width="100px" />
        <br />
        <Skeleton animation="wave" height={10} width="190px" />
      </Box>
    </div>
  );
}

// Create custom hook to save previous conversation
const usePrevious = (data) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = data
  }, [data])
  return ref.current;
}

const Conversations = ({ searchTerm }) => {
  console.log(' Conversations render');
  const userId = JSON.parse(localStorage.getItem('profile')).result._id;

  const conversation = useSelector(state => state.conversation);
  const conversations = useSelector(state => state.conversations, shallowEqual);
  const searchResult = useSelector(state => state.friends);

  const classes = useStyles();
  let preConversationId = usePrevious(conversation?._id);


  useEffect(() => {
  let newMessagesCount = 0;

  conversations?.forEach(c => {
   newMessagesCount = c?.lastMessageInfo[0]?.isReadBy?.some(readerId => readerId !== userId) ? newMessagesCount+=1 : newMessagesCount
  })

  if( newMessagesCount > 0) {
    document.title = `(${newMessagesCount}) ALi Chat`
  }

  },[conversations])

  useEffect(() => {
    emitJoinConversation({ newConversation: conversation?._id, oldConversation: preConversationId });
  }, [conversation]);

  const tempArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  if (!searchTerm) {
    return (
      <List className={classes.conversationlist} disablePadding>
        {conversations === null ?
          tempArr.map(item => <ConversationSkeleton key={item} />)
          : conversations.map((item, index) => (<Conversation key={index} conversation={item} />))}
      </List>
    )
  } else {
    return (
      <List className={classes.conversationlist} disablePadding >
        {searchResult.map((user, index) => <SearchResult key={index} user={user} />)}
      </List>
    )
  }

}

export default Conversations