import {FETCH_SETTING,RECEIVED_SETTING,FETCH_SETTING_ERROR,SAVE_SETTING} from '../actions/SettingsAction'

const initialSettingState = {
    host : "http://localhost",
    port : 8989,
    collection : "collection1"
}

export default function commandReducer(state = {}, action){
    switch (action.type) {
        case FETCH_SETTING:
            return { ...state, fetching:true}
            break
        case RECEIVED_SETTING:
            return { ...state, fetching:false, fetched:true}
            break
        case FETCH_SETTING_ERROR:
            return {...state, fetching:false, fetched:true, error:action.payload}
            break
        case SAVE_SETTING:
            return {
                     ...state,
                     fetching : false,
                     fetched : true,
                     host : action.payload.host,
                     port : action.payload.port,
                     collection : action.payload.collection
                 }
            break
    }
    return state
}
