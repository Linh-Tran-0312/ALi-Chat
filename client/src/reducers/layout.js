const initState = {
    screen: 'LG',
    mode: 'LG',
    mainview: null,
}

export default (state = initState, action) => {
    switch(action.type) {
        case "SET_SCREEN":
            console.log(`DA TOI REDUCER ${action.payload}`);
            return {...state, screen: action.payload, mode: action.payload};
        case "SET_MODE":
            return {...state, mode: action.payload};
        default:
            return {...state}
    }
}