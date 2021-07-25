export default ( conversation = null, action) => {
    switch(action.type){
        case "SELECT_CONVERSATION":    
            return action.payload;
        case "SELECT_NEW_CONVERSATION":
            return action.payload;
        case "CHECK_CONVERSATION":
            if(conversation?._id === action.payload._id) {
                return action.payload
            }
            return conversation;
        case "UPDATE_CURRENT_CONVERSATION": 
        if(conversation._id === action.payload._id) 
        return action.payload;
        return conversation;
        default:
            return conversation;           
    }
}