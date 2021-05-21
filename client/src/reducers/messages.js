export default ( messages= [], action) => {
    switch(action.type){
        case "FETCH_MESSAGES":
            return action.payload;
        case "CREATE_MESSAGE" :
            return [...messages, action.payload];
        case "FETCH_PRE_MESSAGES":
            return [...action.payload, ...messages];
        default:
            return messages;          
    }
}