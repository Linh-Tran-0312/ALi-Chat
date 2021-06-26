export default ( conversations = [], action) => {
    switch(action.type){
        case "FETCH_CONVERSATIONS":    
            return action.payload;
        case "CREATE_NEW_CONVERSATION":
            return [action.payload,...conversations];
        case "UPDATE_CONVERSATIONS":
         const updatedConversations = conversations.map(c => {return c._id === action.payload._id ? action.payload : c});
         return updatedConversations;
        default:
            return conversations;           
    }
}