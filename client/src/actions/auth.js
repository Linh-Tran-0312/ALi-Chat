import * as api from '../api';

export const signIn = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
       
        dispatch({ type: "AUTH", payload: data });
        history.push('/chat');
    } catch (error) {
        if (error.response) {
            dispatch({ type: "LOGIN_ERROR", payload: error.response.data.message })
        } else {
            dispatch({ type: "LOGIN_ERROR", payload: "Oops sorry, something went wrong. Please try again. " })
        }
        console.log(error);
    }
}
export const signUp = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: "AUTH", payload: data });
        history.push('/chat');
    } catch (error) {
        if (error.response) {
            dispatch({ type: "LOGIN_ERROR", payload: error.response.data.message })
        } else {
            dispatch({ type: "LOGIN_ERROR", payload: "Oops sorry, something went wrong. Please try again. " })
        }
        console.log(error);
    }
}

export const signInWithGoogle = (tokenId, history) => async (dispatch) => {
    try {
        const { data } = await api.signInWithGoogle(tokenId);
        dispatch({ type: "AUTH", payload: data });
        history.push('/chat');
    } catch (error) {
        dispatch({ type: "ERROR_MESSAGE", payload: "Google Sign In was unsuccessful. Try again later" });
    }
}
export const signInWithFacebook = (accessToken, history) => async (dispatch) => {
    try {
        const { data } = await api.signInWithFacebook(accessToken);
        dispatch({ type: "AUTH", payload: data });
        history.push('/chat');
    } catch (error) {
        dispatch({ type: "ERROR_MESSAGE", payload: "Facebook Sign In was unsuccessful. Try again later" });
    }
}

export const logout = (history) => async (dispatch) => {
    dispatch({ type: 'USER_LOGOUT' });
    history.push('/');
}

export const loadProfile = (user) => async (dispatch) => {
    dispatch({ type: 'LOAD_PROFILE', payload: user })
}

export const passwordLengthInvalid = () => async (dispatch) => {
    dispatch({ type: "LOGIN_ERROR", payload: 'Password must be at least 6 characters long. Please try again !' });
}
export const clearErrorMessage = () => async (dispatch) => {
    dispatch({ type: "LOGIN_ERROR", payload: '' });
}
export const socialLoginError = (message) => async (dispatch) => {
    dispatch({ type: 'ERROR_MESSAGE', payload: message });
}

