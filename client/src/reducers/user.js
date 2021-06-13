 

export default ( user = "", action) => {
    switch(action.type){
        case "SET_PROFILE":
            return action.payload
        default:
            return user;          
    }
}