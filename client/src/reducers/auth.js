const initState = {
    currentProfile: null,
    authData: null
}
export default (state= initState, action) => {
    switch(action.type){
        case "AUTH":
            localStorage.setItem('profile', JSON.stringify({ ...action.data}));
            return {...state, authData: action.data};
        case "LOGOUT":
                localStorage.clear();
                return {...state, authData: null, currentProfile: null,};
        case "SET_AVATAR":
            let currentProfile = JSON.parse(localStorage.getItem('profile'));
            console.log(currentProfile);
            currentProfile.result.avatar = action.payload.avatar;
            localStorage.setItem('profile', JSON.stringify({...currentProfile}));
            return {...state, currentProfile }
        default:
            return state         
    }
}