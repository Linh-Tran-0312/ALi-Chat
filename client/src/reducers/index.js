import { combineReducers } from 'redux';

import conversations from './conversations';
import conversation from './conversation';
import auth from './auth';
import profile from './profile';
import friends from './friends';
import messages from './messages';
import lastMessage from './lastMessage';
import userResult from './userResult';

export default combineReducers({ conversations, auth, profile, userResult, friends, messages, lastMessage, conversation });