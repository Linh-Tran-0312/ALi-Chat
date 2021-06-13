export default (  authData =  null, action) => {
    switch(action.type){
        case "AUTH":
            localStorage.setItem('profile', JSON.stringify({ ...action?.data}));
            return action.data;
        case "LOGOUT":
                localStorage.clear();
                return authData;
        case "SET_AVATAR":
            let currentProfile = JSON.parse(localStorage.getItem('profile'));
            console.log(currentProfile);
            currentProfile.result.avatar = action.payload.avatar;
            localStorage.setItem('profile', JSON.stringify({...currentProfile}));
            return currentProfile
        default:
            return authData;          
    }
}