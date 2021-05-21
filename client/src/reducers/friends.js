export default ( friends = [], action) => {
    switch(action.type){
        case "FETCH_FRIENDS":
            return action.payload;
        default:
            return friends;          
    }
}