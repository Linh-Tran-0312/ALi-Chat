const initState = {
    updateProfileError: '',
    loginError: ''
}
export default ( state = initState, action) => {
    switch(action.type){
        case "UPDATE_PROFILE_ERROR":
            return {...state, updateProfileError: action.payload};
        case "LOGIN_ERROR":
                return {...state, loginError: action.payload}
        default:
            return state;          
    }
}