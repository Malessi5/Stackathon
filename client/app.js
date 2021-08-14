import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import Saved from './components/Saved';
import Random from './components/Random';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/saved" component={Saved} />
        <Route exact path="/random" component={Random} />
        <Route path="/" component={Random} />
        {/* <Route path="/" component={Main} /> */}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('main')
);
