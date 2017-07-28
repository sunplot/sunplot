import { combineReducers } from 'redux'
import CommandReducer from './CommandReducer'
import SettingReducer from './SettingReducer'

export default combineReducers({
        queryResponse:CommandReducer,
        setting:SettingReducer})
