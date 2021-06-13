import { combineReducers } from 'redux';

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

export default combineReducers({ conversations, user, auth, profile, userResult, friends, messages, lastMessage, conversation, members });