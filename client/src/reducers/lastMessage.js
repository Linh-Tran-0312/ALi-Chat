export default ( lastMessage = "", action) => {
    switch(action.type){
        case "GET_LAST_MESSAGE":
            return action.payload;
        default:
            return lastMessage;          
    }
}