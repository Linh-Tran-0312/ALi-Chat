import { combineReducers } from 'redux';

/* import {userReducer} from './userReducer';
import {authReducer} from './authReducer';
import {messageReducer} from './messageReducer';
import {conversationReducer} from './conversationReducer'; */

 import conversations from './conversations';
import conversation from './conversation';
import auth from './auth';
import user from './user';
import profile from './profile';
import friends from './friends';
import messages from './messages';
import lastMessage from './lastMessage';
import userResult from './userResult';
import members from './memberSearch'; 
import onlineUsers from './onlineUsers';

export default combineReducers({ conversation, conversations, auth, user, profile, friends, messages, lastMessage, userResult, members, onlineUsers});