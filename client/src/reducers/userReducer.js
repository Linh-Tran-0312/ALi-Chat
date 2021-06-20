const initState = {
friends: [],
members: [],
profile: null,
user: null,
userResult: null,
}

export const userReducer =  (state = initState, action) => {
    switch(action.type) {
        case "FETCH_FRIENDS":
            return {...state, friends: action.payload} ;  
        case "FETCH_MEMBERS":
            return {...state, members: action.payload} ; 
        case "FETCH_PROFILE":
            return {...state, profile: action.payload} ; 
        case "SELECT_PROFILE":
            return {...state, profile: action.payload} ; 
        case "SET_PROFILE":
            return {...state, user: action.payload} ; 
        case "SELECT_USER_RESULT":
            return {...state, userResult: action.payload} ; 
        default:
            return state;
    }
}