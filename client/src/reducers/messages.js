const initState = {
    messages: [],
    isLoadingMore: false,
    isSent: false
}

export default ( state = initState, action) => {
    switch(action.type){
        case "FETCH_MESSAGES":
            return {...state, messages: action.payload};
        case "CREATE_MESSAGE" :
            return {...state, isSent: true, messages: [...state.messages, action.payload]};
           // return [...messages, action.payload];
        case "FETCH_PRE_MESSAGES":
            return {...state, isSent: false, isLoadingMore: false, messages: [ ...action.payload,...state.messages]};
           // return [...action.payload, ...messages];
        case "LOADING_MORE":
            console.log(action.payload)
            return {...state, isLoadingMore: action.payload}
        case "UPDATE_MESSAGES":
          const  userId = JSON.parse(localStorage.getItem('profile')).result._id;
        
            if(action.payload.sender === userId) {
                console.log("tin nhan cua nguoi gui", action.payload)
                state.messages[state.messages.length - 1] = action.payload; 
            }            
            return {...state};
        case "NOTIFY_MESSAGE":
            return {...state, messages: [...state.messages, action.payload]}
        default:
            return state;          
    }
}