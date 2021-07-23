import { combineReducers } from 'redux';

import conversations from './conversations';
import conversation from './conversation';
import auth from './auth';
import profile from './profile';
import friends from './friends';
import messages from './messages';
import userResult from './userResult';
import onlineUsers from './onlineUsers';
import layout from './layout';
import error from './error';

const appReducer = combineReducers({ layout, error, conversation, conversations, auth, profile, friends, messages, userResult, onlineUsers});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        localStorage.clear();
      return appReducer(undefined, action)
    }
  
    return appReducer(state, action)
  }

  export default rootReducer