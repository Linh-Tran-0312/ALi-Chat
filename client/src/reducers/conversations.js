export default ( conversations = [], action) => {
    switch(action.type){
        case "FETCH_CONVERSATIONS":    
            return action.payload;
        case "CREATE_NEW_CONVERSATION":
            return [action.payload,...conversations]
        default:
            return conversations;           
    }
}