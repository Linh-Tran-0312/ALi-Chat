
import * as api from '../api/index';

export const selectProfile = (profile) => async(dispatch) => {
        dispatch({ type: "SELECT_PROFILE", payload: profile});
        dispatch({type: "VIEW_PROFILE"});
};

export const updateAvatar = (userId, formData) => async(dispatch) => {
    try {
        const { data } = await api.updateAvatar(userId, formData);
        dispatch({ type: "FETCH_PROFILE", payload: data});
        dispatch({ type: "SET_AVATAR", payload: data });
        dispatch({ type: "SET_PROFILE", payload: data})
     
    } catch (error) {
        console.log(error, error.message);
    }
}

export const updateProfile = (id, formData) => async(dispatch) => { 
    try {
        const { data } = await api.updateProfile(id, formData);
        dispatch({ type: "FETCH_PROFILE", payload: data});
        dispatch({ type: "SET_PROFILE", payload: data})
        dispatch({type: "VIEW_PROFILE"});
    } catch (error) {
        console.log(error);  
    }
}

export const selectUserResult = (user) => async(dispatch) => {
    dispatch({ type: "SELECT_USER_RESULT", payload: user});
    dispatch({ type: "VIEW_CHATFEED"});
    dispatch({ type: "SELECT_CONVERSATION", payload : null});
}

 export const searchFriends = (formData) => async(dispatch) => {
     try {
         const { data } = await api.fetchFriends(formData);
         dispatch({ type: "FETCH_FRIENDS", payload : data })
     } catch (error) {
        console.log(error);
     }
}

export const searchMembers = async(formData) => {
     try {
        const { data } = await api.fetchMembers(formData);
       return data;
     } catch (error) {
        console.log(error);
     }
}

export const updateOnlineUsers = (users) => async(dispatch) => {
    dispatch({ type: "UPDATE_ONLINE_USERS", payload : users })
}
