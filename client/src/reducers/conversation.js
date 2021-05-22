export default ( conversation = "", action) => {
    switch(action.type){
        case "SELECT_CONVERSATION":    
            return action.payload;
        case "SELECT_NEW_CONVERSATION":
            return action.payload;
        default:
            return conversation;           
    }
}