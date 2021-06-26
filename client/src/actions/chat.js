import * as api from '../api';

export const getConversations = () => async(dispatch) => {
    try {
        
        const { data } = await api.fetchConversations();
        console.log('toi action', Array.isArray(data));
        dispatch({ type: 'FETCH_CONVERSATIONS', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}
export const createGroupConversation = (formData) => async(dispatch) => {
    
}
export const getMessages = (id) => async(dispatch) => {
    try {
        const { data } = await api.fetchMessages(id);
        dispatch({ type: 'FETCH_MESSAGES', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const createFirstMessage = (formData ) => async(dispatch) => {
     try {
         const { data } = await api.createFirstMessage(formData);
         console.log(data.message);
         console.log(data.conversation);
         dispatch({ type: 'CREATE_MESSAGE', payload: data.message});
         dispatch({ type: 'CREATE_NEW_CONVERSATION', payload: data.conversation})
     } catch (error) {
        console.log(error.message)
     }
}

export const getLastMessage = (message) => async(dispatch) => {
    try {
        dispatch({ type: 'GET_LAST_MESSAGE', payload: message})
    } catch (error) {
        console.log(error.message)
    }
};

export const getAllConversations = (conversations) => async(dispatch) => {
    try {
        dispatch({ type: 'FETCH_CONVERSATIONS', payload: conversations})
    } catch (error) {
        console.log(error.message)
    }
};
export const selectConversation = (conversation) => async(dispatch) => {
    try {
        dispatch({ type: "SELECT_CONVERSATION", payload: conversation});
        dispatch({ type: "VIEW_CHATFEED"});
        dispatch({ type: "FETCH_MESSAGES",  payload: []})
    } catch (error) {
        console.log(error.message)
    }
}
export const getAllMessages = (messages) => async(dispatch) => {
    try {
        dispatch({ type: 'FETCH_MESSAGES', payload: messages})
    } catch (error) {
        console.log(error.message)
    }
}
export const getPreMessages = (messages) => async(dispatch) => {
    try {
        dispatch({ type: 'FETCH_PRE_MESSAGES', payload: messages})
    } catch (error) {
        console.log(error.message)
    }
}

export const sendMessage = (message) => async(dispatch) => {
    try {
         
        dispatch({ type: 'CREATE_MESSAGE', payload: message})
    } catch (error) {
        console.log(error.message)
    }
}

export const updateMessages = (message) => async(dispatch) => {
    try {
         
        dispatch({ type: 'UPDATE_MESSAGES', payload: message})
    } catch (error) {
        console.log(error.message)
    }
}
export const updateConversationAfterMemberChange = (response) => async(dispatch) => {
    try {
        dispatch({ type: "SELECT_CONVERSATION", payload: response.conversation});
        dispatch({ type: "UPDATE_CONVERSATIONS", payload: response.conversation})
        dispatch({ type: 'NOTIFY_MESSAGE', payload: response.message});
        dispatch({ type: 'VIEW_CHATFEED'});
    } catch (error) {
        console.log(error.message)
    }
}
export const updateConversation = (conversation) => async(dispatch) => {
    try {
        const   { data } = await api.updateConversation(conversation);
       
        dispatch({ type: "SELECT_CONVERSATION", payload: data});
        dispatch({ type: "SELECT_USER_RESULT", payload: null})
        dispatch({ type: "SELECT_PROFILE", payload: null})
    } catch (error) {
        console.log(error.message)
    }
}

export const setIsLoadingMore = (value) => async(dispatch) => {
    try {
         
        dispatch({ type: 'LOADING_MORE', payload: value})
    } catch (error) {
        console.log(error.message)
    }
}

export const isRemovedFromGroup = () => async(dispatch) => {
            
    try {
         
        dispatch({ type: 'SELECT_CONVERSATION', payload:null});
        dispatch({ type: 'VIEW_CONVERSATIONS'});
    } catch (error) {
        console.log(error.message)
    }
}

 