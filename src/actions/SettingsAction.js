export function getSetting(){
    return dispatch=> {
        return fetch('/api/settings')
                .then(res => res.json())
                .then(data => dispatch(setSetting(data)))
    }

}

export const GET_SETTING = 'GET_SETTING'
export function setSetting(setting){
    return {
        type: GET_SETTING,
        setting
    }

}
export function saveSettings(data){
    return dispatch => {
        return fetch('/api/settings',{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type":"application/json"
            }
        }).then(handleResponse)
    }
    return {
        type:"UPDATE_SETTING",
        payload: data
    }
}

function handleResponse(res){
    if(!!res && res.ok){
        return res
    }else {
        let error = new Error(res.status.text)
        error.response = res
        throw error
    }
}
