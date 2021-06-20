const initState = {
lastMessage: null,
messages: [],
}

export const messageReducer = (state = initState, action) => {
        switch(action.type) {
          
            case "GET_LAST_MESSAGE":
                return {...state, lastMessage: action.payload};
            case "FETCH_MESSAGES":
                return {...state, messages: action.payload};
            case "CREATE_MESSAGE" :
                return {...state, messages: [...state.messages, action.payload]};
            case "FETCH_PRE_MESSAGES":
                return {...state, messages: [...action.payload, ...state.messages]};
            default:
                return state;
        } 
}