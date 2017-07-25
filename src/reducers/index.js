import { combineReducers } from 'redux'
import SolrReducer from './SolrReducer'
import CommandReducer from './CommandReducer'
import SettingReducer from './SettingReducer'

export default combineReducers({
        solrs:SolrReducer,
        queryResponse:CommandReducer,
        setting:SettingReducer})
