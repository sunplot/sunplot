import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers'
import promise from 'redux-promise-middleware'
import {loadState, saveState} from './localStorage'

const middleware = applyMiddleware(thunk, logger)
const persistedState = loadState()

const store = createStore(reducers,persistedState,middleware)

//Add a listener to save changes every time we have a state change. User to persist setting.
store.subscribe(() => {
    saveState(store.getState())
})

export default store
