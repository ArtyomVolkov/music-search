import {combineReducers} from 'redux';
// reducers
import app from './app';
import player from  './player';
import searchResults from './search-results';
import system from './system';

const ROOT = combineReducers({
  app,
  player,
  system,
  searchResults
});

export default ROOT;
