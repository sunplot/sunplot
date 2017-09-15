import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import store from './store'
import App from './containers/App';
import SolrList from './containers/SolrList';


injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'));
