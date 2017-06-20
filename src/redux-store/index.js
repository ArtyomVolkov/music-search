import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import ROOT from '../reducers/index';

const STORE = createStore(
  ROOT,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default STORE;