export const UPDATE_TAB_STATE = "UPDATE_TAB_STATE"
export const GET_TAB_STATE = "GET_TAB_STATE"

export function updateTabsState(data){
    return dispatch => {
        dispatch(setSetting(data))
    }
}
function setSetting(payload){
    return {
        type : UPDATE_TAB_STATE,
        payload
    }
}


export function getTabsState(){
    return {
        type : UPDATE_TAB_STATE,
    }
}
