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

