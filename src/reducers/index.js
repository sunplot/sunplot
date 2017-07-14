import { combineReducers } from 'redux'
import SolrReducer from './SolrReducer'
import CommandReducer from './CommandReducer'

export default combineReducers({ solrs:SolrReducer, docs:CommandReducer })
