import * as api from '../api';

export const getConversationByIds = (userId) => async (dispatch) => {
    try {
        const { data } = await api.getConversationByUserIds(userId);
        if (data.length !== 0) {
            dispatch({ type: "SELECT_CONVERSATION", payload: data[0] });
        }
    } catch (error) {
        console.log(error.message)
    }
};

export const selectConversation = (conversation) => async (dispatch) => {
    dispatch({ type: "SELECT_CONVERSATION", payload: conversation });
    dispatch({ type: "VIEW_CHATFEED" });
    dispatch({ type: "FETCH_MESSAGES", payload: [] })
};


export const sendMessage = (message) => async (dispatch) => {
    dispatch({ type: 'ADD_MESSAGE', payload: message })
}

export const updateMessages = (message) => async (dispatch) => {
    dispatch({ type: 'UPDATE_MESSAGES', payload: message })
}

export const updateConversation = (conversation) => async (dispatch) => {
    try {
        const { data } = await api.updateConversation(conversation);
        dispatch({ type: "SELECT_CONVERSATION", payload: data });
        dispatch({ type: "SELECT_USER_RESULT", payload: null })
        dispatch({ type: "SELECT_PROFILE", payload: null })
    } catch (error) {
        console.log(error.message)
    }
}

export const setIsLoadingMore = (value) => async (dispatch) => {
    dispatch({ type: 'LOADING_MORE', payload: value })
}

export const isRemovedFromGroup = () => async (dispatch) => {
    dispatch({ type: 'SELECT_CONVERSATION', payload: null });
    dispatch({ type: 'VIEW_CONVERSATIONS' });
}

export const clearCurrentMessages = () => async (dispatch) => {
    dispatch({ type: "FETCH_MESSAGES", payload: [] })
}

export const readNewMessage = () => async (dispatch) => {
    dispatch({ type: 'READ_NEW_MESSAGE' })
}

export const replyMessage = (message) => async (dispatch) => {
    dispatch({ type: "REPLY_MESSAGE", payload: message})
}
