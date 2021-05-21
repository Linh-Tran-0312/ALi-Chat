import * as api from '../api/index';

export const getUserProfile = (id) => async(dispatch) => {
    try {
        const { data } = await api.fetchUserProfile(id);
        dispatch({ type: "FETCH_PROFILE", payload: data});
    } catch (error) {
        console.log(error, error.message);
    }
};
 export const searchFriends = (formData) => async(dispatch) => {
     try {
         const { data } = await api.fetchFriends(formData);
         dispatch({ type: "FETCH_FRIENDS", payload : data })
     } catch (error) {
        console.log(error, error.message);
     }
 }