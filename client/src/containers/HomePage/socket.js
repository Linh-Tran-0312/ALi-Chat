import store from '../../store';
import getSocket from '../../socket';
 
export const onGetAllConversations = (conversations) => {
        store.dispatch({ type: 'FETCH_CONVERSATIONS', payload: conversations})
};

export const  onUpdateMessagesAndConversations = (data) => {
        store.dispatch({ type: "UPDATE_MESSAGES", payload: data.message});
        store.dispatch({ type: "UPDATE_CONVERSATIONS", payload: data.conversation});
       store.dispatch({ type: "UPDATE_CURRENT_CONVERSATION", payload: data.conversation });
};

export const onUpdateNewConversation = (data) => {
        store.dispatch({ type: "UPDATE_CONVERSATIONS", payload: data.conversation});
        store.dispatch({ type: "SELECT_CONVERSATION", payload: data.conversation});
        store.dispatch({ type: "NEW_MESSAGE", payload: data.message })
        store.dispatch({ type: "VIEW_CHATFEED"});
};

export const onGetAllMessages = (messages) => {
        console.log(messages)
        store.dispatch({ type: 'FETCH_MESSAGES', payload: messages})
}
export const onGetPreMessages = (messages) => {
 store.dispatch({ type: 'FETCH_PRE_MESSAGES', payload: messages})
}

export const onUpdateConversationAfterMemberChange = (response) => {
        store.dispatch({ type: "SELECT_CONVERSATION", payload: response.conversation});
        store.dispatch({ type: "UPDATE_CONVERSATION", payload: response.conversation})
        store.dispatch({ type: 'NOTIFY_MESSAGE', payload: response.message});
        store.dispatch({ type: 'VIEW_CHATFEED'});

}

export const onUpdateConversationsAfterAdded = (response) => {
    store.dispatch({ type: "UPDATE_CONVERSATIONS", payload: response.conversation})
};

export const onUpdateConversationsAfterRemoved = (response) => {
    store.dispatch({ type: 'SELECT_CONVERSATION', payload:null});
    store.dispatch({ type: 'VIEW_CONVERSATIONS'});
    store.dispatch({ type: "REMOVE_CONVERSATION", payload: response.conversation})
};

export const onUpdateMessageReader = data => {
    store.dispatch({ type: 'UPDATE_MESSAGE_READER', payload: data })
}

export const onGetUserTypingMessage = data => {
    store.dispatch({ type: "ADD_USER_TYPING", payload: data.user})
}
export const onGetUserStopTypingMessage = data => {
    store.dispatch({ type: "REMOVE_USER_TYPING", payload: data.userId})
}

export const onUpdateOnlineUsers = (users) => {
       store.dispatch({ type: "UPDATE_ONLINE_USERS", payload : users })
}

export const emitJoinRoomUserId = (userId) => {
    getSocket().emit("join", userId)
}

export const emitJoinConversation = (data) => {
    getSocket().emit('join-conversation',data)
}

export const emitGetConversations = (userId) => {
    getSocket().emit('getConversations', userId)
}

export const emitGetMessages = (conversationId) => {
    getSocket().emit('getMessages', conversationId)
}
export const emitGetPreMessages = (data) => {
    getSocket().emit('getPreMessages', data)
}

export const emitSendMessage = (data) => {
    getSocket().emit('sendMessage', data)
}

export const emitCreateNewConversation = (data) => {
    getSocket().emit('createNewConversation', data)
}

export const emitUserReadLastMessage = (data) => {
    getSocket().emit('userReadLastMessage', data)
}
export const emitUserIsTypingMessage = (data) => {
    getSocket().emit('userIsTypingMessage', data)
}

export const emitUserStopTyingMessage = (data) => {
    getSocket().emit('userStopTypingMessage', data)
}

export const emitAddMember = (data) => {
    getSocket().emit('addMember', data)
}

export const emitRemoveMember = (data) => {
    getSocket().emit('removeMember', data)
}

export const emitCreateGroupChat = (data) => {
    getSocket().emit('createGroupChat', data)
}