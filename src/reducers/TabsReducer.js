import {UPDATE_TAB_STATE, GET_TAB_STATE} from '../actions/TabsAction'
export default function tabsReducer(state = {activeTab : 0}, action){
    console.log("Tabs" ,action.type)
    switch (action.type) {
        case UPDATE_TAB_STATE:
            return { ...state, activeTab: action.payload}
            break;
        case GET_TAB_STATE:
            return {...state}
            break;
    }
    return state
}
