import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import injectTapEventPlugin from 'react-tap-event-plugin'
import store from './store'
import App from './containers/App';
import SolrList from './containers/SolrList';


injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/sql" component={App} />
                <Route path="/streaming" component={App} />
                <Route path="/" component={SolrList} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
