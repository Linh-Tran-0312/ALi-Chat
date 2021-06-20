const initState = {
    conversation: null,
    conversations: []
}

export const conversationReducer = (state = initState, action) => {
    switch(action.type) {
    case "SELECT_CONVERSATION":    
        return {...state, conversation: action.payload};
    case "SELECT_NEW_CONVERSATION":
        return {...state, conversation: action.payload};
    case "FETCH_CONVERSATIONS":    
        return {...state, conversations: action.payload};
    case "CREATE_NEW_CONVERSATION":
        return {...state, ...state.conversations.unshift(action.payload)};
    default:
        return state;
    }
}