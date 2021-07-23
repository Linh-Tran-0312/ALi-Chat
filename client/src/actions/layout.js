
export const changeScreen = (screen) => async (dispatch) => {
   dispatch({ type: "SET_SCREEN", payload: screen })
}

export const changeMode = (mode) => async (dispatch) => {
   dispatch({ type: "SET_MODE", payload: mode })
};

export const viewProfile = () => async (dispatch) => {
   dispatch({ type: "VIEW_PROFILE" })
}
export const viewChatInfo = () => async (dispatch) => {
   dispatch({ type: "VIEW_CHATINFO" })
}
export const viewChatFeed = () => async (dispatch) => {
   dispatch({ type: 'VIEW_CHATFEED' })
}

export const backFromProfile = (conversation) => async (dispatch) => {
   if (conversation == true) {
      dispatch({ type: "VIEW_CHATFEED" });
   } else {
      dispatch({ type: "VIEW_CONVERSATIONS" });
   }
}

export const backToChatList = () => async (dispatch) => {
   dispatch({ type: "SELECT_CONVERSATION", payload: null });
   dispatch({ type: 'VIEW_CONVERSATIONS' })

}