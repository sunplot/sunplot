
export default function commandReducer(state = {}, action){
    console.log("command" ,action.type)
    switch (action.type) {
        case "EXECUTE_QUERY":
            return { state:action.payload, err:null}
            break;
        case "EXECUTE_QUERY_ERROR":
            return { ...state, error:action.payload};
            break;
    }
    return state
}
