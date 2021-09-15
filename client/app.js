import React from 'react';
import ReactDOM from 'react-dom';
import Saved from './components/Saved';
import Random from './components/Random';
import Appbar from './components/Appbar';
import {Provider} from 'react-redux';
import store from './store';
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../public/style.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import {AuthProvider} from './contexts/AuthContext';

ReactDOM.render(
  <AuthProvider>
    <Provider store={store}>
      <Router>
        {/* <Navbar /> */}
        <ToastContainer
          position='bottom-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Appbar />

        <Switch>
          <Route exact path='/saved' component={Saved} />
          <Route exact path='/random' component={Random} />
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route path='/' component={Random} />
          {/* <Route path="/" component={Main} /> */}
        </Switch>
      </Router>
    </Provider>
  </AuthProvider>,
  document.getElementById('main')
);
