const initState = {
    screen: 'LG',
    mode: 'LG',
    view: {
        INTRO : true,
        PROFILE: false,
        CHATLIST: true,
        CHATFEED: false,
        CHATINFO: false,
    }
}

export default (state = initState, action) => {
    switch(action.type) {
        case "SET_SCREEN":
            console.log(`DA TOI REDUCER ${action.payload}`);
            if(state.view.INTRO && !state.view.PROFILE) {
                if(action.payload === 'XS') return {...state, screen: action.payload, mode: action.payload,  view: { INTRO: false, PROFILE: false, CHATFEED: false, CHATINFO: false, CHATLIST: true }};
                return {...state, screen: action.payload, mode: action.payload,  view: { INTRO: true, PROFILE: false, CHATFEED: false, CHATINFO: false, CHATLIST: true }};
            }
            else if (state.view.PROFILE) {
                if(action.payload === 'XS') return {...state, screen: action.payload, mode: action.payload,  view: { INTRO: true, PROFILE: true, CHATFEED: false, CHATINFO: false, CHATLIST: false }};
                return {...state, screen: action.payload, mode: action.payload,  view: { INTRO: true, PROFILE: true, CHATFEED: false, CHATINFO: false, CHATLIST: true }};        
            } else if (state.view.CHATFEED) {
                if(action.payload === 'XS') return {...state, screen: action.payload, mode: action.payload,  view: { INTRO: false, PROFILE: false, CHATFEED: true, CHATINFO: false, CHATLIST: false }};
                else if (action.payload === 'LG') return {...state, screen: action.payload, mode: action.payload,  view: { INTRO: false, PROFILE: false, CHATFEED: true, CHATINFO: true, CHATLIST: true }};        
                return {...state, screen: action.payload, mode: action.payload,  view: { INTRO: false, PROFILE: false, CHATFEED: true, CHATINFO: false, CHATLIST: true }};                  
            } 
            else {
                if(action.payload === 'XS') return state;
                 return {...state, screen: action.payload, mode: action.payload,  view: { INTRO: true, PROFILE: false, CHATFEED: false, CHATINFO: false, CHATLIST: true }};                  
            }
        case "SET_MODE":
            return {...state, mode: action.payload};
        case "VIEW_PROFILE":
            if(state.mode === 'XS') {
                return {...state, view: { INTRO: true, PROFILE: true, CHATFEED: false, CHATINFO: false, CHATLIST: false }}
            } else {
                return {...state, view: { INTRO: true, PROFILE: true, CHATFEED: false, CHATINFO: false, CHATLIST: true }}
            }
        case "VIEW_CONVERSATIONS":
            if(state.mode === 'XS') {
                return {...state, view: { INTRO: false, PROFILE: false, CHATFEED: false, CHATINFO: false, CHATLIST: true }}
            } else {
                return {...state, view: { INTRO: true, PROFILE: false, CHATFEED: false, CHATINFO: false, CHATLIST: true }}
            }
        case "VIEW_CHATFEED":
            if(state.mode === 'XS') {
                return {...state, view: { INTRO: false, PROFILE: false, CHATFEED: true, CHATINFO: false, CHATLIST: true }}
            } else if ( state.mode === 'LG'){
                return {...state, view: { INTRO: false, PROFILE: false, CHATFEED: true, CHATINFO: true, CHATLIST: true }}
            } else {
                return {...state, view: { INTRO: false, PROFILE: false, CHATFEED: true, CHATINFO: false, CHATLIST: true }}
            }
        case "VIEW_CHATINFO": 
            if(state.mode === 'XS')  return {...state, view: { INTRO: false, PROFILE: false, CHATFEED: false, CHATINFO: true, CHATLIST: false }}
        default:
            return state;
    }
}