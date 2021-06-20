export default ( lastMessage = "", action) => {
    switch(action.type){
        case "GET_LAST_MESSAGE":
            console.log('get lastmessage');
            return action.payload;
        default:
            return lastMessage;          
    }
}