import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('main')
);
