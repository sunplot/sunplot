import axios from 'axios'
export const SAVE_SETTING = 'SAVE_SETTING'
export const FETCH_SETTING = 'FETCH_SETTING'
export const RECEIVE_SETTING = 'RECEIVE_SETTING'
export const FETCH_SETTING_ERROR = 'FETCH_SETTING_ERROR'

export function getSetting(){
    // return dispatch=> {
    //     return fetch('/api/settings')
    //             .then(res => res.json())
    //             .then(data => dispatch(getSetting())
    // }
    return {
        type: FETCH_SETTING
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
export function receivSetting(){
    return {
        type: RECEIVE_SETTING,

    }
}

export function saveSettings(data){
    return dispatch => {
        dispatch(fetchSetting)
        return axios.post('/api/settings', data).then((response)=>{
            dispatch(receivSetting)
            if(response.ok){
                dispatch(setSetting(data))
                return response
            }
        }).catch(error => {

            dispatch({type:FETCH_SETTING_ERROR, payload:error.message})
            return {error}
            throw error
        });
    }
}
function handleResponse(res){
    if(!!res && res.ok){
        return res
    } else {
        let error = new Error(res.statusText)
        return error.response = res
        throw error
    }
}
