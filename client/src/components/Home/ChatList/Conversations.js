import {List, useMediaQuery, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector , shallowEqual} from 'react-redux';
import Conversation from './Conversation';
import SearchResult from './SearchResult';
import Skeleton from '@material-ui/lab/Skeleton';
const useStyles = makeStyles(() => ({
  conversationlist: {
    width: '100%',
    overflow: 'auto',
    textAlign: 'center',
    maxHeight: 'calc(100vh - 250px)',
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
    flexDirection :'row',
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
      <br/>
      <Skeleton animation="wave" height={10} width="190px" />
      </Box>
     
     </div>
  );
}

const Conversations = ({ searchTerm }) => {
  console.log('Conversations render');
 
  const classes = useStyles();
   

  const conversations = useSelector(state => state.conversations, shallowEqual);
  const searchResult = useSelector(state => state.friends);
  
  const handleChangeTab = (e, newVal) => {
    setTab(newVal);
};

  const dispatch = useDispatch()
  const tempArr = [1,2,3,4,5,6,7,8,9];
  if (!searchTerm) {
    return (
      <List className={classes.conversationlist} disablePadding>
        {conversations.length === 0 ?  
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