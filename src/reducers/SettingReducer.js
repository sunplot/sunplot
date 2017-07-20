export default function commandReducer(state=[], action){
    console.log("command" ,action.type)
    switch (action.type) {
        case "GET_APP_SETTING":
            return action.payload
            break;
        case "UPDATE_SETTING":
            return action.payload
            break;
    }
    return state
}
