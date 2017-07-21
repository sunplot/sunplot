export function getSetting(){
    return {type:"GET_APP_SETTING",
            payload:{
                host:"http://localhost",
                port:9191,
                collection:"films"}
    }
}

export function saveSettings(data){
    return dispatch =>{
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
