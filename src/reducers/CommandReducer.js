import {EXECUTE_QUERY_ERROR, EXECUTE_QUERY, QUERY_RECEIVED} from '../actions/CommandAction'
export default function commandReducer(state = {}, action){
    console.log("command" ,action.type)
    switch (action.type) {
        case EXECUTE_QUERY:
            return { state: undefined, err:null}
            break;
        case QUERY_RECEIVED:
            return { state: action.payload, err:null}
            break;
        case EXECUTE_QUERY_ERROR:
            return { state:action.payload};
            break;
    }
    return state
}
