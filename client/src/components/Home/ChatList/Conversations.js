import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Conversation from './Conversation';
import SearchResult from './SearchResult';

const useStyles = makeStyles(() => ({
    conversationlist : {
        width: '100%',
        overflow: 'auto',
        maxHeight: 'calc(100vh - 250px)',
        backgroundColor: 'white',
        '&::-webkit-scrollbar': {
            width: '5px',
            visibility: 'invisible'
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'white'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#b7bcd4',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          }
          
      }
}))


const Conversations = ({ searchTerm}) => {
    const classes = useStyles();
     const conversations  = useSelector(state => state.conversations);  
     const  searchResult = useSelector(state => state.friends);  
    const dispatch = useDispatch()
     console.log('conversations render');
    if(!searchTerm) {
        return (
            <List className={classes.conversationlist} disablePadding>
           { conversations.map((item, index) => (<Conversation key={index} conversation={item}  />))}
            </List>
        )
    } else {
        return (
            <List className={classes.conversationlist} disablePadding >          
                    { searchResult.map((user,index) =>  <SearchResult key={index} user={user}/> )  }
            </List>
        )
    }
   
}

export default Conversations