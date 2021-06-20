import * as api from '../api';

export const signIn = (formData, history) => async(dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: "AUTH", data});
        history.push('/chat');
    } catch (error) {
        console.log(error);
    }
}
export const signUp = (formData, history) => async(dispatch) => {
    try {
        console.log(formData);
        const { data } = await api.signUp(formData);
        
        dispatch({ type: "AUTH", data});
        history.push('/chat');
    } catch (error) {
        console.log(error, error.message);
    }
}

export const logout = (history) => async(dispatch) => {
    try {
        dispatch({ type: 'SELECT_PROFILE', payload: null});
        dispatch({ type: "SELECT_CONVERSATION", payload: null});
        dispatch({ type: "SELECT_USER_RESULT", payload: null});
        dispatch({ type: 'LOGOUT'});
        history.push('/');
    } catch (error) {
        
    }
}


