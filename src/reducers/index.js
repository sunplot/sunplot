import { combineReducers } from 'redux'
import SolrReducer from './SolrReducer'
import CommandReducer from './CommandReducer'
import SettingReducer from './SettingReducer'
import { combineForms } from 'react-redux-form';

const settings = {settings: {host:'',port:'',collection:''}}
export default combineReducers({ solrs:SolrReducer, docs:CommandReducer,
     appSetting:
     combineForms(settings)})
