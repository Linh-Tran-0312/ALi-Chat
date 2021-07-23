const initState = {
    messages: [],
    isLoadingMore: false,
    scrollMode: 0, // 0: not scroll, 1: scroll down, 2: scroll to "load more" messages
    newMessage: false,
    typing: null,
}

export default (state = initState, action) => {
    switch (action.type) {
        case "FETCH_MESSAGES":
            return { ...state, messages: action.payload,scrollMode: 1, typingList: [] };
        case "ADD_MESSAGE":
            return { ...state, scrollMode: 1, messages: [...state.messages, action.payload] };
        // return [...messages, action.payload];
        case "FETCH_PRE_MESSAGES":
            if (state.isLoadingMore) {
                return { ...state, scrollMode: 2, isLoadingMore: false, messages: [...action.payload, ...state.messages] };
            }
            return state
        // return [...action.payload, ...messages];
        case "LOADING_MORE":
            console.log(action.payload)
            return { ...state, scrollMode: 0,isLoadingMore: action.payload }
        case "UPDATE_MESSAGES":  
            if(state.messages[0]?.conversation === action.payload.conversation) {
                console.log('update messages')
                const userId = JSON.parse(localStorage.getItem('profile')).result._id;
                let updatedMessages = [...state.messages];
                if (action.payload.sender === userId) {
                    updatedMessages[updatedMessages.length - 1] = action.payload;
                    state.scrollMode = 1;
                } else {
                    if (!updatedMessages.find(x => x._id === action.payload._id)) {
                        updatedMessages.push(action.payload);
                        state.scrollMode = 0;
                        state.newMessage = true;
                    }
                }
                return { ...state,messages: updatedMessages };
            }
          return state;
        case 'READ_NEW_MESSAGE':
            if(state.newMessage) {
                return {...state, newMessage: false};
            }
            return state;
        case "UPDATE_MESSAGE_READER":
            let messages = [...state.messages];
            if (messages[0]?.conversation === action.payload.message.conversation) {
                messages = messages.map(m => m._id === action.payload.message._id ? action.payload.message : m)
                return { ...state, scrollMode: 0, messages }
            }
            return state;
        case "NOTIFY_MESSAGE":
            return { ...state, scrollMode: 0, messages: [...state.messages, action.payload] };
        case "NEW_MESSAGE":
            return {...state, messages: [action.payload]}
        case "ADD_USER_TYPING":
            if(!state.typing || state.typing._id !== action.payload._id) 
            return { ...state, typing: action.payload}
            return state;
        case "REMOVE_USER_TYPING":
            if(state.typing && state.typing?._id === action.payload) 
            return { ...state, typing: null}
            return state;
        default:
            return state;
    }
}