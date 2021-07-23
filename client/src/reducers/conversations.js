export default ( conversations = null, action) => {
    switch(action.type){
        case "FETCH_CONVERSATIONS":    
            return action.payload;
        case "CREATE_NEW_CONVERSATION":
            return [action.payload,...conversations];
        case "UPDATE_CONVERSATION":
         const updatedConversations = conversations.map(c => {return c._id === action.payload._id ? action.payload : c});
         return updatedConversations;
        case "UPDATE_CONVERSATIONS":
            const isHavingThisCon = conversations.find( c => c._id === action.payload._id);
            console.log("data toi update_conversations")
            if(isHavingThisCon){
                console.log('co conver nay')           
                const tempConversations = conversations.filter(c => c._id !== action.payload._id);    
                return [action.payload,...tempConversations]       
            } else {
                console.log('khong co conver nay')
          
                return [action.payload,...conversations]
            }
        case "REMOVE_CONVERSATION":
            const newConversations = conversations.filter( c => c._id !== action.payload._id)
            return newConversations;
        default:
            return conversations;           
    }
}