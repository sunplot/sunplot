import {GET_SETTING} from '../actions/SettingsAction'
export default function commandReducer(state=['host':'','port':8983, 'collection':''], action){
    console.log("command" ,action.type)
    switch (action.type) {
        case GET_SETTING:
            return action.setting
            break;
        case "UPDATE_SETTING":
            return action.payload
            break;
    }
    return state
}
