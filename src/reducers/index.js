import {combineReducers} from 'redux';
// reducers
import app from './app';
import player from  './player';

const ROOT = combineReducers({
  app,
  player
});

export default ROOT;
