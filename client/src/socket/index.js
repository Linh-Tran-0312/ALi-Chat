import socketIOClient from "socket.io-client";
import * as chat from '../containers/HomePage/socket';
import * as layout from '../actions/layout';
import * as user from '../actions/user';
import store from '../store';


const serverEndpoint = process.env.REACT_APP_SERVER_URL;

let socket = socketIOClient(serverEndpoint);

export const configSocket = () => {
    if(socket?.disconnected) {
        socket.connect();
    }

    socket.on('message', chat.onUpdateMessagesAndConversations);
    socket.on('sendConversations', chat.onGetAllConversations);
    socket.on('succeedInCreateNewConversation', chat.onUpdateNewConversation);
    socket.on('sendMessages', chat.onGetAllMessages);
    socket.on('sendPreMessages', chat.onGetPreMessages);
    socket.on('updateUserReadMessage', chat.onUpdateMessageReader);

    socket.on('SucceedInAddMember', chat.onUpdateConversationAfterMemberChange) // for people who are chatting in this conversation
    socket.on('updateConversationsAfterAdded', chat.onUpdateConversationsAfterAdded) // for person who is added to this conversation

    socket.on('SucceedInRemoveMember', chat.onUpdateConversationAfterMemberChange) // for people who are chatting in this conversation
    socket.on('updateConversationsAfterRemoved', chat.onUpdateConversationsAfterRemoved) // for person who is removed from this conversation

    socket.on('sendOnlineUsers', chat.onUpdateOnlineUsers);
     
    socket.on('getUserIsTypingMessage', chat.onGetUserTypingMessage)
    socket.on('getUserStopTypingMessage', chat.onGetUserStopTypingMessage)

    
}
export const socketDisconnect = () => {
  socket.disconnect();
};

export default function getSocket() {
  return socket;
}
//export let socket =   socketIOClient("http://localhost:5000");