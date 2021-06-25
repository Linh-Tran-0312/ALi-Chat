import {List, useMediaQuery} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector , shallowEqual} from 'react-redux';
import Conversation from './Conversation';
import SearchResult from './SearchResult';

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
  }
}))

const Conversations = ({ searchTerm }) => {
  console.log('Conversations render');
 
  const classes = useStyles();

  const conversations = useSelector(state => state.conversations, shallowEqual);
  const searchResult = useSelector(state => state.friends);
  
  const dispatch = useDispatch()

  if (!searchTerm) {
    return (
      <List className={classes.conversationlist} disablePadding>
        {conversations.map((item, index) => (<Conversation key={index} conversation={item} />))}
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