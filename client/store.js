import { createStore, applyMiddleware } from 'redux';
import reducers from './redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const store = createStore(
  reducers,
  applyMiddleware(thunkMiddleware, createLogger())
);

export default store;
