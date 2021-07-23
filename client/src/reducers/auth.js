const initState = {
    currentProfile: null,
    authData: null,
}
export default (state= initState, action) => {
    switch(action.type){
        case "AUTH":
            localStorage.setItem('profile', JSON.stringify({ ...action.payload}));
            return {...state,authData: action.payload, currentProfile: action.payload.result };
        case "LOGOUT":
                localStorage.clear();
                return {...state, authData: null, currentProfile: null,};
        case "SET_AVATAR":
            let currentProfile = JSON.parse(localStorage.getItem('profile'));
            
            currentProfile.result.avatar = action.payload.avatar;
            localStorage.setItem('profile', JSON.stringify({...currentProfile}));
            return {...state, currentProfile };
        case "SET_PROFILE":
            let profile = JSON.parse(localStorage.getItem('profile'));           
            profile.result = action.payload;
            localStorage.setItem('profile', JSON.stringify({...profile}));        
            return {...state, currentProfile : profile.result };
        case "LOAD_PROFILE":
            return {...state, currentProfile: action.payload};
        default:
            return state         
    }
}