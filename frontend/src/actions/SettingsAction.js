import axios from 'axios'
export const SAVE_SETTING = 'SAVE_SETTING'
export const FETCH_SETTING = 'FETCH_SETTING'
export const RECEIVED_SETTING = 'RECEIVED_SETTING'
export const FETCH_SETTING_ERROR = 'FETCH_SETTING_ERROR'

export function getSetting(){
    return dispatch=> {
        dispatch(fetchSetting)
        dispatch(receivedSetting)
    }
}
export function fetchSetting(){

    return {
        type: FETCH_SETTING
    }
}

export function setSetting(payload){
    return {
        type: SAVE_SETTING,
        payload
    }
}
export function receivedSetting(){
    return {
        type: RECEIVED_SETTING,

    }
}

export function saveSettings(data){
    return dispatch => {
        dispatch(fetchSetting)
        dispatch(receivedSetting)
        dispatch(setSetting(data))

    }
}
