export function getSetting(){
    return {type:"GET_APP_SETTING",
            payload:{
                host:"http://localhost",
                port:9191,
                collection:"films"}
    }
}

export function updatesSetting(setting){
    return {
        type:"UPDATE_SETTING",
        payload: setting
    }
}
