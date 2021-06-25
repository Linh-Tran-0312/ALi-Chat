
import * as api from '../api/index';

export const getUserProfile = (id) => async(dispatch) => {
    try {
        const { data } = await api.fetchUserProfile(id);
        dispatch({ type: "FETCH_PROFILE", payload: data});
    } catch (error) {
        console.log(error, error.message);
    }
};
export const selectProfile = (profile) => async(dispatch) => {
    try {
        dispatch({ type: "SELECT_PROFILE", payload: profile});
        dispatch({ type: "SELECT_CONVERSATION", payload: null});
        dispatch({ type: "SELECT_USER_RESULT", payload: null})
    } catch (error) {
        console.log(error, error.message);
    }
};
export const updateAvatar = (formData) => async(dispatch) => {
    console.log("da toi action")
    try {
        const { data } = await api.updateAvatar(formData);
        console.log(data);
        dispatch({ type: "FETCH_PROFILE", payload: data});
        dispatch({ type: "SET_AVATAR", payload: data });
        dispatch({ type: "SET_PROFILE", payload: data})
     
    } catch (error) {
        console.log(error, error.message);
    }
}

export const selectUserResult = (user) => async(dispatch) => {
    try {
        dispatch({ type: "SELECT_USER_RESULT", payload: user});
        dispatch({ type: "SELECT_PROFILE", payload: null});
        dispatch({ type: "SELECT_CONVERSATION", payload: null});
    } catch (error) {
        console.log(error, error.message);
    }
}
 export const searchFriends = (formData) => async(dispatch) => {
     try {
         const { data } = await api.fetchFriends(formData);
         dispatch({ type: "FETCH_FRIENDS", payload : data })
     } catch (error) {
        console.log(error, error.message);
     }
 }
 export const searchMembers = (formData) => async(dispatch) => {
     try {
        const { data } = await api.fetchMembers(formData);
        dispatch({ type: "FETCH_MEMBERS", payload : data })
     } catch (error) {
        console.log(error, error.message);
     }
 }
 export const clearSearchMembers = () => async(dispatch) => {
    try {
        dispatch({ type: "FETCH_MEMBERS", payload : [] })
     } catch (error) {
        console.log(error, error.message);
     }
 }

 export const updateOnlineUsers = (users) => async(dispatch) => {
     try {
        dispatch({ type: "UPDATE_ONLINE_USERS", payload : users })
     } catch (error) {
        console.log(error, error.message);
     }
 }

 export const changeScreen  = (screen) => async(dispatch) => {
    try {
        dispatch({ type: "SET_SCREEN", payload : screen })
     } catch (error) {
        console.log(error, error.message);
     }
 }
 export const changeMode = (mode) => async(dispatch) => {
    try {
        dispatch({ type: "SET_MODE", payload : mode })
     } catch (error) {
        console.log(error, error.message);
     }
 }