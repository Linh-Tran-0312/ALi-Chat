export default (onlineUsers = [], action) => {
    switch(action.type) {
        case "UPDATE_ONLINE_USERS":
            return action.payload;
        default:
            return onlineUsers;
    }
}