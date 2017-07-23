import {FETCH_SETTING,RECEIVE_SETTING,FETCH_SETTING_ERROR,SAVE_SETTING} from '../actions/SettingsAction'

const initalState = {
    host:"http://localhost",
    port:9191,
    collection:"films",
    fetching:false,
    fetched:false,
    error:null
}
export default function commandReducer(state = initalState, action){
    switch (action.type) {
        case FETCH_SETTING:
            return { ...state, fetching:true}
            break
        case RECEIVE_SETTING:
            return { ...state, fetching:false, fetched:true }
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
