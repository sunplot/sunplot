import { combineReducers } from 'redux'
import CommandReducer from './CommandReducer'
import SettingReducer from './SettingReducer'
import TabsReducer from './TabsReducer'

export default combineReducers({
        queryResponse:CommandReducer,
        setting:SettingReducer,
        activeTab:TabsReducer})
