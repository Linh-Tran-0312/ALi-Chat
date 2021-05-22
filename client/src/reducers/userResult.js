export default ( userResult = "", action) => {
    switch(action.type){
        case "SELECT_USER_RESULT":
            return action.payload;
        default:
            return userResult;          
    }
}