import { combineReducers } from 'redux';

import conversations from './conversations';
import auth from './auth';
import user from './user';
import friends from './friends';
import messages from './messages';
import lastMessage from './lastMessage';

export default combineReducers({ conversations, auth, user, friends, messages, lastMessage });