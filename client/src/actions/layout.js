
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
 };

export const viewProfile = () => async(dispatch) => {
     try {
        dispatch({ type: "VIEW_PROFILE"})
     } catch (error) {
        console.log(error, error.message);
     }
}

export const backFromProfile = (conversation) => async(dispatch) => {
    try {
        if(conversation == true) {
            dispatch({type: "VIEW_CHATFEED"});

        } else {
            dispatch({type: "VIEW_CONVERSATIONS"});

        }
     } catch (error) {
        console.log(error, error.message);
     }
}

export const backToChatList = () => async(dispatch) => {
    try {
         dispatch({ type: "SELECT_CONVERSATION", payload: null});
         dispatch({ type: 'VIEW_CONVERSATIONS'})
     } catch (error) {
        console.log(error, error.message);
     }
}