import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Conversation from './Conversation';
import SearchResult from './SearchResult';

const useStyle = makeStyles(() => ({
    conversationlist : {
        width: '100%',
        overflow: 'auto',
        maxHeight: 'calc(100vh - 250px)',
        backgroundColor: 'white'
      }
}))


const Conversations = ({ searchTerm}) => {
    const classes = useStyle();
     const conversations = useSelector(state => state.conversations);  
    const searchResult = useSelector(state => state.friends);
    const dispatch = useDispatch()
     console.log('conversations render');
     console.log(searchResult);
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