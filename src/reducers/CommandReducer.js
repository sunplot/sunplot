export default function commandReducer(state=[], action){
    console.log("command" ,action.type)
    switch (action.type) {
        case "EXECUTE_QUERY":
            return action.payload
            break;
        case "EXECUTE_QUERY_ERROR":
            return [];
            break;
    }
    return state
}
